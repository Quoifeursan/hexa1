(() => {
  const rng = (min, max) => Math.random() * (max - min) + min;
  const irng = (min, max) => Math.floor(rng(min, max + 1));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));


  function backToMenu() {
  window.location.href = 'index.html';
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  // Ajout des event listeners pour les boutons
  const playButton = document.getElementById('backToMenuButton');
  
  if (playButton) {
    playButton.addEventListener('click', backToMenu);
  }
});



    // STATS DU JOUEUR
  const state = {
    round: 1,
    player: {
      maxHP: 500, hp: 500,
      energie: 80, force: 80, trans: 40,
      resSpec: 40, resReal: 20, resGlob: 10,
      supSpec: 0, supReal: 0, supBrut: 0,
      speed: 200, crit: 0,
      passives: [],
      stacks: {},
      tempSpeedBoost: 0,
    },
    monster: {},
    log: [],
  };

  // ==== Helpers ====
  function log(msg){
    state.log.unshift(msg);
    const el = document.getElementById('log');
    el.innerHTML = state.log.slice(0,80).map(l=>`• ${l}`).join('<br/>');
  }

  const $ = (id) => document.getElementById(id);

  function effRes(res, sup){ return Math.max(0, res - sup); }
  function dmgFormula(atk, res){ return Math.floor(atk * 100 / (100 + Math.max(0, res))); }
  function tryCrit(attacker){ return (Math.random()*100 < attacker.crit) ? 2 : 1; }

  function calcDamage(attacker, defender, type){
    // type: 'special' | 'real' | 'pure'
    let base = 0, res = 0;
    if (type==='special'){
      base = attacker.energie;
      res = effRes(defender.resSpec, attacker.supSpec); // globale ne s applique pas
    } else if (type==='real'){
      base = attacker.force;
      const r1 = effRes(defender.resReal, attacker.supReal);
      const r2 = effRes(defender.resGlob, attacker.supBrut); // brut suppr reduit la globale
      res = r1 + r2; // cumule les deux res
    } else {
      base = attacker.trans;
      const rG = effRes(defender.resGlob, attacker.supBrut);
      res = rG;
    }
    const crit = tryCrit(attacker);
    const dmg = dmgFormula(base * crit, res);
    return {dmg, crit: crit>1};
  }

  function applyHit(target, amount){
    target.hp = clamp(target.hp - amount, 0, target.maxHP);
  }



//****************************************************************
//                                                               *
//                       SCALING OPPONENT                        *
//                                                               *
//****************************************************************
  function newMonster(){
    const r = state.round;
    const t = Math.max(0, r - 1);
    const growth = 1 + 0.06*t + 0.007*t*t;
    const m = {
      name: 'adversaire',
      maxHP: Math.floor(220 * growth * rng(1,1.03)),
      hp: 0,
      energie: Math.floor(25 * growth * rng(0.9, 1.1)),
      force: Math.floor(25 * growth * rng(0.9, 1.1)),
      trans: Math.floor(8 * growth * rng(0.9, 1.2)),
      resSpec: Math.floor(5 * growth * rng(0.9, 1.2)),
      resReal: Math.floor(4 * growth * rng(0.9, 1.2)),
      resGlob: Math.floor(2 * growth * rng(0.9, 1.2)),
      supSpec: Math.floor(2 * growth * rng(0.8,1.3)),
      supReal: Math.floor(2 * growth * rng(0.8,1.3)),
      supBrut: Math.floor(2 * growth * rng(0.8,1.3)),
      speed: Math.floor(100 * growth * rng(0.9, 1.1)),
      crit: 5,
    };
    m.hp = m.maxHP;
    state.monster = m;
  }
//****************************************************************





  function checkpoint(){
    state.player.hp = state.player.maxHP;
    openPassiveChoice();
  }

  function render(){
    
    const p = state.player, m = state.monster;
    $('round').textContent = state.round;

    // HP bars
    const pPct = Math.round(p.hp / p.maxHP * 100);
    $('pHPFill').style.width = pPct + '%';
    $('pHPTxt').textContent = `PV: ${p.hp}/${p.maxHP}`;
    const mPct = Math.round(m.hp / m.maxHP * 100);
    $('mHPFill').style.width = mPct + '%';
    $('mHPTxt').textContent = `PV: ${m.hp}/${m.maxHP}`;

    // Player stats
    $('pEnergie').textContent = p.energie.toFixed(1).replace('.0','');
    $('pForce').textContent   = p.force.toFixed(1).replace('.0','');
    $('pTrans').textContent   = p.trans.toFixed(1).replace('.0','');
    $('pVitesse').textContent = (p.speed + (p.tempSpeedBoost||0)).toFixed(0);
    $('pCrit').textContent    = p.crit + '%';
    $('pResSpec').textContent = p.resSpec;
    $('pResReal').textContent = p.resReal;
    $('pResGlob').textContent = p.resGlob;
    $('pSupSpec').textContent = p.supSpec;
    $('pSupReal').textContent = p.supReal;
    $('pSupBrut').textContent = p.supBrut;

    // Monster stats
    $('mEnergie').textContent = m.energie;
    $('mForce').textContent   = m.force;
    $('mTrans').textContent   = m.trans;
    $('mVitesse').textContent = m.speed;
    $('mCrit').textContent    = m.crit + '%';
    $('mResSpec').textContent = m.resSpec;
    $('mResReal').textContent = m.resReal;
    $('mResGlob').textContent = m.resGlob;
    $('mSupSpec').textContent = m.supSpec;
    $('mSupReal').textContent = m.supReal;
    $('mSupBrut').textContent = m.supBrut;

    // Tags
    $('monsterTags').innerHTML = `<span class="tag">vit. ${m.speed}</span><span class="tag">crit ${m.crit}%</span>`;

    // passives list
    $('passiveList').innerHTML = p.passives.map(pid => {
  const pDef = PASSIVES.find(x=>x.id===pid);
  const stacks = p.stacks[pid] ? ` (x${p.stacks[pid]})` : '';
  return `<span class="passive">${pDef?.name||pid}${stacks}</span>`;
  }).join('');
  }

  let defeated = false;

  function setButtonsEnabled(on){
    $('atkSpecial').disabled = !on;
    $('atkReal').disabled = !on;
    $('atkPure').disabled = !on;
  }

  function attackRound(type){
    if (defeated) return;
    const p = state.player, m = state.monster;
    // Pre-fight hooks (flash etc.)
    PASSIVES.forEach(ps=>ps.onPreFight && p.passives.includes(ps.id) && ps.onPreFight(state));
    const spdP = p.speed + (p.tempSpeedBoost||0);
    const order = spdP >= m.speed ? ['player','monster'] : ['monster','player'];

    for (const who of order){
      if (p.hp<=0 || m.hp<=0) break;
      if (who==='player'){
        const {dmg, crit} = calcDamage(p, m, type);
        applyHit(m, dmg);
        log(`Joueur inflige ${label(type)} ${dmg}${crit?' 💥':''}.`);
        // passive onAttack
        PASSIVES.forEach(ps=>ps.onAttack && p.passives.includes(ps.id) && ps.onAttack(state, dmg, type));
      }

       else {
        // adversaire attaque aléatoire
        const mType = ['special','real','pure'][irng(0,2)];
        const {dmg, crit} = calcDamage(m, p, mType);
        applyHit(p, dmg);
        log(`adversaire inflige ${label(mType)} ${dmg}${crit?' 💥':''}.`);
        // passive onHit
        PASSIVES.forEach(ps=>ps.onHit && p.passives.includes(ps.id) && ps.onHit(state, dmg));
      }
    }

    p.tempSpeedBoost = 0; // consumed

// check deaths
if (m.hp <= 0) {
  log('— Victoire !');
  // onKill hooks
  PASSIVES.forEach(ps => ps.onKill && p.passives.includes(ps.id) && ps.onKill(state));
  state.round += 1;





//****************************************************************
//                                                               *
//                    CHECKPOINTS GESTION                        *
//                                                               *
//****************************************************************
  if (state.round <= 50) {
    if ((state.round - 1) % 5 === 0) checkpoint();
  } else if (state.round <= 100){
    if ((state.round - 1) % 10 === 0) checkpoint();
  }
//****************************************************************



  newMonster();
}

    if (p.hp<=0){
      defeated = true;
      setButtonsEnabled(false);
      log('— Défaite…');
      $('loseModal').showModal();
    }

    render();
  }

  function label(type){
    return type==='special'?'🔵':(type==='real'?'🟠 ':'🔴 ');
  }

  function randomChoices(arr, n){
    const bag = [...arr];
    const out = [];
    while(out.length<n && bag.length){
      const i = irng(0, bag.length-1);
      out.push(bag.splice(i,1)[0]);
    }
    return out;
  }





  
  function openPassiveChoice() {
  const modal = $('passiveModal');

  // On filtre les passifs dispo pour la manche actuelle
  const availablePassives = PASSIVES.filter(p => 
  (!p.unlockRound || p.unlockRound <= state.round) &&
  (!p.maxRound || p.maxRound >= state.round)
);

  // On pioche dans ceux-là
  const picks = randomChoices(availablePassives, 3);

  const container = $('choices');
  container.innerHTML = '';

  picks.forEach(p => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<h4 class="item-title">${p.name}</h4><div class="muted small">${p.desc}</div>`;
    div.onclick = () => {
      if (!state.player.passives.includes(p.id)) state.player.passives.push(p.id);
      p.apply && p.apply(state); // apply immediate effects if any
      modal.close();
      render();
    };
    container.appendChild(div);
  });

  modal.showModal();
}




  // ==== Event listeners ====
  $('atkSpecial').onclick = () => attackRound('special');
  $('atkReal').onclick    = () => attackRound('real');
  $('atkPure').onclick    = () => attackRound('pure');
  $('closePassive').onclick = () => $('passiveModal').close();
  $('btnReload').onclick = () => location.reload();

  // ==== Init ====
  newMonster();
  render();
  openPassiveChoice();
})();