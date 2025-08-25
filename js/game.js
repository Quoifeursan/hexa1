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
  // ITEMS AGOUGOUGAGA
  const PASSIVES = [


  //ITEMS DE DEPART
    { id: 'Illumination', name: 'Illumination', desc: '+100 Transcendance',maxRound: 7, apply: (ctx) => { ctx.player.trans += 100; } },
    { id: 'mage', name: 'Baton ancestral', desc: '+50 Énergie',maxRound: 7, apply: (ctx) => { ctx.player.energie  += 50; } },
    { id: 'bully', name: 'Dague affinée', desc: '+50 Force',maxRound: 7, apply: (ctx) => { ctx.player.force += 50; } },
    { id: 'pavins', name: 'Armure des Pavins', desc: '+40 Résistance Reel<br>+40 résistance Spéciale<br>+150 PV',maxRound: 7, apply: (ctx) => { ctx.player.resSpec += 40; ctx.player.resReal += 40; ctx.player.maxHP += 150; ctx.player.hp += 150;} },
    { id: 'book', name: 'Livre magique', desc: '+20 Suppression Spéciale<br>+20 Suppression Réel,',maxRound: 7, apply: (ctx) => { ctx.player.supSpec += 20; ctx.player.supReal += 20;} },
    { id: 'hero', name: 'Fusil du héro', desc: '+10% de chance de critique<br>+25 Force',maxRound: 7, apply: (ctx) => { ctx.player.crit += 10; ctx.player.force += 25;} },
    { id: 'ring', name: 'Bague sainte', desc: '+20 Energie<br>+100 PV',maxRound: 7, apply: (ctx) => { ctx.player.energie += 20; ctx.player.maxHP += 100; ctx.player.hp += 100;} },
    { id: 'fruit', name: 'Fruit vert', desc:'Vous gagnez +20PVMax à chaque élimination (max 10 stacks)', maxRound: 7, onKill: (ctx) => { ctx.player.stacks.fruit = (ctx.player.stacks.fruit || 0); if (ctx.player.stacks.fruit < 10) { ctx.player.maxHP += 20; ctx.player.hp += 20; ctx.player.stacks.fruit++; } } },


  //ITEM RARES
    { id: 'azerty', name: 'Sceptre d`azerty', desc: "+50 Energie<br>Chaque attaque infligée vous occtoie: +4 Énergie",unlockRound: 10, maxRound: 49, apply: (ctx) => {ctx.player.energie += 50;}, onAttack: (ctx) => { ctx.player.energie += 4; ctx.player.stacks.azerty = (ctx.player.stacks.azerty || 0) + 1;} },
    { id: 'granitShield', name: 'Bouclier de granit', desc: 'À chaque attaque subie : +10% des dégâts subis en PV Max.',unlockRound: 10, maxRound: 49, onHit: (ctx, dmg) => { ctx.player.maxHP = Math.ceil(ctx.player.maxHP + dmg * 0.10); ctx.player.stacks.granitShield = (ctx.player.stacks.granitShield || 0) + 1;} },
    { id: 'restes', name: 'Pomme ensorcelée', desc: '+20 SupprSpé<br>À chaque ennemi tué : +20% PV max (soin).',unlockRound: 10, maxRound: 49, onKill: (ctx) => { const heal = Math.floor(ctx.player.maxHP * 0.20); ctx.player.hp = clamp(ctx.player.hp + heal, 0, ctx.player.maxHP); } }, 
    { id: 'furry', name: 'Epée maudite de Rexil', desc: 'Vous sacrifiez 25% de vos PV max mais doublez vos dégâts réels.',unlockRound: 10, maxRound: 49, apply: (ctx) => { ctx.player.maxHP = Math.floor(ctx.player.maxHP * 0.75); if (ctx.player.hp > ctx.player.maxHP) { ctx.player.hp = ctx.player.maxHP; } ctx.player.force *= 2; }},    
    { id: 'ledruarmor', name: 'Armure Ledruienne', desc: 'À chaque attaque subie : +10 transandance',unlockRound: 10, maxRound: 49, onHit: (ctx, dmg) => { ctx.player.trans += 10; ctx.player.stacks.ledruarmor = (ctx.player.stacks.ledruarmor || 0) + 1;} },
    { id: 'harpe', name: 'harpe élémentaire', desc: 'Chaque tour vous soignez vos PV équivalents à 50% de votre Energie',unlockRound: 10, maxRound: 49, onKill: (ctx) => { const heal = Math.floor(ctx.player.energie * 0.50); ctx.player.hp = clamp(ctx.player.hp + heal, 0, ctx.player.maxHP); } },
    { id: 'magicspirit', name: 'Esprit magique', desc: "Vous gagnez 60% de votre énergie en PV Max.",unlockRound: 10, maxRound: 49, apply: (ctx) => { const bonus = Math.floor(ctx.player.energie * 0.6); ctx.player.maxHP += bonus; ctx.player.hp += bonus; } },
    { id: 'gambit', name: 'Fruit de Phenox', desc: 'vous divisez par 2 toutes vos stats offensives mais multipliez vos PV Max par 3',unlockRound: 10, maxRound: 49, apply: (ctx) => {ctx.player.maxHP *= 3 ; ctx.player.energie /=2; ctx.player.force /=2; ctx.player.trans /=2; ctx.player.hp = ctx.player.maxHP; }},
    { id: 'pikpik', name: 'Bouclier de Jorifice', desc: '+200 PV<br>vous renvoyez a votre adversaire 10% des PV qu il vous inflige', unlockRound: 10, maxRound: 49, onHit: (ctx, dmg) => { const reflect = Math.floor(dmg * 0.10); ctx.monster.hp = clamp(ctx.monster.hp - reflect, 0, ctx.monster.maxHP); },  apply: (ctx) =>{ctx.player.maxHP += 200; ctx.player.hp += 200;} },
    { id: 'adrenaline', name: 'Adrénaline', desc: 'vous perdez tout vos PV mais vous gagnez +9000 vit et +1000 en attaque',unlockRound: 10, maxRound: 49, apply: (ctx) => { ctx.player.maxHP = Math.floor(ctx.player.maxHP = 1); if (ctx.player.hp > ctx.player.maxHP) { ctx.player.hp = ctx.player.maxHP; } ctx.player.force += 1000; ctx.player.speed +=9000; }},
    { id: 'kleenex', name: 'Kleenex choix', desc: 'Chaque coup infligé vous gagnez 15 de vitesse', unlockRound: 10, maxRound: 49, onAttack: (ctx) => {ctx.player.speed += 15; ctx.player.stacks.kleenex = (ctx.player.stacks.kleenex || 0) + 1;},},
    { id: 'endurancebreaker', name: 'Briseur d’Endurance', desc: "À chaque attaque infligée au même adversaire, vos dégâts augmentent de 2% (reset après sa mort).", unlockRound: 15, maxRound: 51, onAttack: (ctx) => { if (!ctx.player.stacks) ctx.player.stacks = 0; ctx.player.stacks += 0.02;}, onDamage: (ctx, dmg) => { return Math.floor(dmg * (1 + (ctx.player.stacks || 0))); }, onKill: (ctx) => { ctx.player.stacks = 0;} },


    { id: 'ironwill', name: 'Volonté de Fer', desc: "Quand vos PV passent sous 30%, vous gagnez +50 Résistance Spéciale et Réelle jusqu’à la fin du combat", unlockRound: 10, maxRound: 49, onTurn: (ctx) => { if (ctx.player.hp <= ctx.player.maxHP * 0.3) { ctx.player.resSpec += 50; ctx.player.resReal += 50; } } },

{ id: 'shadowdagger', name: 'Dague de l’Ombre', desc: "Vos coups critiques infligent +25% de dégâts supplémentaires", unlockRound: 10, maxRound: 49, onDamage: (ctx, dmg) => { if (Math.random()*100 < ctx.player.crit) { return Math.floor(dmg * 1.25); } return dmg; } },

{ id: 'stoneheart', name: 'Cœur de Pierre', desc: "Vous gagnez +1% PV Max à chaque coup reçu (max 30%)", unlockRound: 10, maxRound: 49, onHit: (ctx, dmg) => { ctx.player.stacks.stoneheart = (ctx.player.stacks.stoneheart || 0); if (ctx.player.stacks.stoneheart < 30) { ctx.player.maxHP = Math.floor(ctx.player.maxHP * 1.01); ctx.player.stacks.stoneheart++; } } },
  //ITEM EPIQUES
    { id: 'aze72', name: 'Fusil Imperial AZE72', desc: "Chaque attaque infligée vous auguemente votre energie de 20",unlockRound: 50, maxRound: 100, onAttack: (ctx) => { ctx.player.energie += 20; ctx.player.stacks.aze72 = (ctx.player.stacks.aze72 || 0) + 1;} },
    { id: 'hyperviolent', name: 'Lame hyperviolente', desc: "+50% Crit<br>+100 Suppr.Reel<br>x2 Force",unlockRound: 50, maxRound: 100, apply: (ctx) => { ctx.player.force *= 2; ctx.player.crit += 50; ctx.player.supReal += 100;} },
    { id: 'spec', name: 'Racine Sucrée', desc: "Vous gagnez un bonus de PV Max équivalent à 50% votre pourcentage de critiques.", unlockRound: 50, maxRound: 100, apply: (ctx) => { const bonus = Math.round(ctx.player.maxHP * ((ctx.player.crit / 100) / 2)); ctx.player.maxHP += bonus; ctx.player.hp += bonus; } },
    { id: 'miracle', name: 'Voile Miracle', desc: "+200 Res. Spe<br>+200 Res.Reel<br>+200 Res. Globale",unlockRound: 50, maxRound: 100, apply: (ctx) => { ctx.player.resSpec += 200;ctx.player.resReal += 200;ctx.player.resGlob += 200;} },
    { id: 'spikefruit', name:'Fruit épineux', desc:'Vous gagnez de la force équivalent à 10% de vos PVMax',  unlockRound: 50,unlockRound: 100, apply: (ctx) => { ctx.player.force += (0.1 * ctx.player.maxHP)},},
    { id: 'lancetrans', name: 'Lance Transperçante', desc: 'Vous gagnez 20% de votre Force en Suppr Réelle', unlockRound: 50,unlockRound: 100, apply: (ctx,dmg) => { ctx.player.supReal += (ctx.player.force / 5)}},
    { id: 'aura', name: 'Menace terrifiantes', desc: 'vous réduisez les stats offensives ennemie de 5% a chaque attaque subie', unlockRound: 0,unlockRound: 100, onHit: (ctx) => { ctx.monster.energie *= 0.95; ctx.monster.force *= 0.9; ctx.monster.trans *= 0.95; }},
    { id: 'bloodmoon', name: 'Lame de la Lune Sanglante', desc: "Chaque coup infligé vous soigne de 15% des dégâts infligés", unlockRound: 50, maxRound: 100, onDamage: (ctx, dmg) => { const heal = Math.floor(dmg * 0.15); ctx.player.hp = clamp(ctx.player.hp + heal, 0, ctx.player.maxHP); return dmg; } },
    { id: 'timewarp', name: 'Sablier du Paradoxe', desc: "Tous les 3 tours, vous regagnez 20% de vos PV Max", unlockRound: 50, maxRound: 100, onTurn: (ctx) => { ctx.player.stacks.timewarp = (ctx.player.stacks.timewarp || 0) + 1; if (ctx.player.stacks.timewarp % 3 === 0) { const heal = Math.floor(ctx.player.maxHP * 0.2); ctx.player.hp = clamp(ctx.player.hp + heal, 0, ctx.player.maxHP); } } },
    { id: 'overdrive', name: 'Surcharge Instable', desc: "Double vos dégâts infligés mais vous perdez 5% de vos PV Max à chaque attaque", unlockRound: 50, maxRound: 100, onAttack: (ctx) => { ctx.player.maxHP = Math.max(1, Math.floor(ctx.player.maxHP * 0.95)); if (ctx.player.hp > ctx.player.maxHP) ctx.player.hp = ctx.player.maxHP; }, onDamage: (ctx, dmg) => { return dmg * 2; } },
    { id: 'soulharvest', name: 'Moissonneuse d’âmes', desc: "À chaque ennemi tué : +5 Force et +5 Énergie (stack infini)", unlockRound: 50, maxRound: 100, onKill: (ctx) => { ctx.player.force += 5; ctx.player.energie += 5; ctx.player.stacks.soulharvest = (ctx.player.stacks.soulharvest || 0) + 1; } },
    { id: 'phoenixfeather', name: 'Plume du Phénix', desc: "La première fois que vous mourrez, vous ressuscitez avec 50% de vos PV Max (1 fois par run)", unlockRound: 50, maxRound: 100, onDeath: (ctx) => { if (!ctx.player.stacks.phoenixfeather) { ctx.player.stacks.phoenixfeather = 1; ctx.player.hp = Math.floor(ctx.player.maxHP * 0.5); return false; } return true; } },



   

{ id: 'eternalflame', name: 'Flamme Éternelle', desc: "À chaque tour, gagnez +5 Force et +5 Énergie (stack infini)", unlockRound: 50, maxRound: 100, onTurn: (ctx) => { ctx.player.force += 5; ctx.player.energie += 5; ctx.player.stacks.eternalflame = (ctx.player.stacks.eternalflame || 0) + 1; } },

{ id: 'colossusarmor', name: 'Armure du Colosse', desc: "Vous réduisez tous les dégâts subis de 15%, mais votre vitesse est réduite de 30%", unlockRound: 50, maxRound: 100, apply: (ctx) => { ctx.player.speed = Math.floor(ctx.player.speed * 0.7); }, onDamageTaken: (ctx, dmg) => { return Math.floor(dmg * 0.85); } },

{ id: 'manashield', name: 'Bouclier de Mana', desc: "Quand vous subissez des dégâts, 50% sont absorbés par votre énergie au lieu de vos PV", unlockRound: 50, maxRound: 100, onHit: (ctx, dmg) => { const manaDmg = Math.floor(dmg * 0.5); if (ctx.player.energie >= manaDmg) { ctx.player.energie -= manaDmg; return Math.floor(dmg * 0.5); } return dmg; } },

{ id: 'stormbringer', name: 'Porte-Tempête', desc: "Chaque attaque a 20% de chance d’électrocuter l’ennemi, infligeant 10% de ses PV actuels en dégâts bruts", unlockRound: 50, maxRound: 100, onAttack: (ctx) => { if (Math.random() < 0.2) { const shock = Math.floor(ctx.monster.hp * 0.1); ctx.monster.hp = clamp(ctx.monster.hp - shock, 0, ctx.monster.maxHP); } } },

    
    ]



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

  // Revised scaling: very easy starts, gradual ramp-up
  function newMonster(){
    const r = state.round;
    const t = Math.max(0, r - 1);
    const growth = 1 + 0.06*t + 0.007*t*t; // doux au début, accélère lentement
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

  // Checkpoint system
  if (state.round <= 50) {
    if ((state.round - 1) % 5 === 0) checkpoint();
  } else {
    if ((state.round - 1) % 10 === 0) checkpoint();
  }

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