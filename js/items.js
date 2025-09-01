  const PASSIVES = [

//              ITEMS DE DEPART
//
//              Manche 0 -> 9



  { id: 'Illumination', name: 'Illumination', desc: '+100 Transcendance',maxRound: 7, apply: (ctx) => { ctx.player.trans += 100; } },
    { id: 'mage', name: 'Baton ancestral', desc: '+50 Énergie',maxRound: 7, apply: (ctx) => { ctx.player.energie  += 50; } },
    { id: 'bully', name: 'Dague affinée', desc: '+50 Force',maxRound: 7, apply: (ctx) => { ctx.player.force += 50; } },
    { id: 'pavins', name: 'Armure des Pavins', desc: '+40 Résistance Reel<br>+40 résistance Spéciale<br>+150 PV',maxRound: 7, apply: (ctx) => { ctx.player.resSpec += 40; ctx.player.resReal += 40; ctx.player.maxHP += 150; ctx.player.hp += 150;} },
    { id: 'book', name: 'Livre magique', desc: '+20 Suppression Spéciale<br>+20 Suppression Réel,',maxRound: 7, apply: (ctx) => { ctx.player.supSpec += 20; ctx.player.supReal += 20;} },
    { id: 'hero', name: 'Fusil du héro', desc: '+10% de chance de critique<br>+25 Force',maxRound: 7, apply: (ctx) => { ctx.player.crit += 10; ctx.player.force += 25;} },
    { id: 'ring', name: 'Bague sainte', desc: '+20 Energie<br>+100 PV',maxRound: 7, apply: (ctx) => { ctx.player.energie += 20; ctx.player.maxHP += 100; ctx.player.hp += 100;} },
    { id: 'fruit', name: 'Fruit vert', desc:'Vous gagnez +20PVMax à chaque élimination (max 10 stacks)', maxRound: 7, onKill: (ctx) => { ctx.player.stacks.fruit = (ctx.player.stacks.fruit || 0); if (ctx.player.stacks.fruit < 10) { ctx.player.maxHP += 20; ctx.player.hp += 20; ctx.player.stacks.fruit++; } } },


//              ITEMS COMMUNS
//
//              Manche 10 -> 49


    { id: 'azerty', name: 'Sceptre d`azerty', desc: "+50 Energie<br>Chaque attaque infligée vous occtoie: +4 Énergie",unlockRound: 10, maxRound: 49, apply: (ctx) => {ctx.player.energie += 50;}, onAttack: (ctx) => { ctx.player.energie += 4; ctx.player.stacks.azerty = (ctx.player.stacks.azerty || 0) + 1;} },
    { id: 'granitShield', name: 'Bouclier de granit', desc: 'À chaque attaque subie : +10% des dégâts subis en PV Max.',unlockRound: 10, maxRound: 49, onHit: (ctx, dmg) => { ctx.player.maxHP = Math.ceil(ctx.player.maxHP + dmg * 0.10); ctx.player.stacks.granitShield = (ctx.player.stacks.granitShield || 0) + 1;} },
    { id: 'restes', name: 'Pomme ensorcelée', desc: '+20 SupprSpé<br>À chaque ennemi tué : +20% PV max (soin).',unlockRound: 10, maxRound: 49, onTurn: (ctx) => { const heal = Math.floor(ctx.player.maxHP * 0.20); ctx.player.hp = clamp(ctx.player.hp + heal, 0, ctx.player.maxHP); } }, 
    { id: 'furry', name: 'Epée maudite de Rexil', desc: 'Vous sacrifiez 25% de vos PV max mais doublez vos dégâts réels.',unlockRound: 10, maxRound: 49, apply: (ctx) => { ctx.player.maxHP = Math.floor(ctx.player.maxHP * 0.75); if (ctx.player.hp > ctx.player.maxHP) { ctx.player.hp = ctx.player.maxHP; } ctx.player.force *= 2; }},    
    { id: 'ledruarmor', name: 'Armure Ledruienne', desc: 'À chaque attaque subie : +10 transandance',unlockRound: 10, maxRound: 49, onHit: (ctx, dmg) => { ctx.player.trans += 10; ctx.player.stacks.ledruarmor = (ctx.player.stacks.ledruarmor || 0) + 1;} },
    { id: 'harpe', name: 'harpe élémentaire', desc: 'Chaque tour vous soignez vos PV équivalents à 50% de votre Energie',unlockRound: 10, maxRound: 49, onTurn: (ctx) => { const heal = Math.floor(ctx.player.energie * 0.50); ctx.player.hp = clamp(ctx.player.hp + heal, 0, ctx.player.maxHP); } },
    { id: 'magicspirit', name: 'Esprit magique', desc: "Vous gagnez 60% de votre énergie en PV Max.",unlockRound: 10, maxRound: 49, apply: (ctx) => { const bonus = Math.floor(ctx.player.energie * 0.6); ctx.player.maxHP += bonus; ctx.player.hp += bonus; } },
    { id: 'gambit', name: 'Fruit de Phenox', desc: 'vous divisez par 2 toutes vos stats offensives mais multipliez vos PV Max par 3',unlockRound: 10, maxRound: 49, apply: (ctx) => {ctx.player.maxHP *= 3 ; ctx.player.energie /=2; ctx.player.force /=2; ctx.player.trans /=2; ctx.player.hp = ctx.player.maxHP; }},
    { id: 'pikpik', name: 'Bouclier de Jorifice', desc: '+200 PV<br>vous renvoyez a votre adversaire 10% des PV qu il vous inflige', unlockRound: 10, maxRound: 49, onHit: (ctx, dmg) => { const reflect = Math.floor(dmg * 0.10); ctx.monster.hp = clamp(ctx.monster.hp - reflect, 0, ctx.monster.maxHP); },  apply: (ctx) =>{ctx.player.maxHP += 200; ctx.player.hp += 200;} },
    { id: 'adrenaline', name: 'Adrénaline', desc: 'vous perdez tout vos PV mais vous gagnez +9000 vit et +1000 en attaque',unlockRound: 10, maxRound: 49, apply: (ctx) => { ctx.player.maxHP = Math.floor(ctx.player.maxHP = 1); if (ctx.player.hp > ctx.player.maxHP) { ctx.player.hp = ctx.player.maxHP; } ctx.player.force += 1000; ctx.player.speed +=9000; }},
    { id: 'kleenex', name: 'Kleenex choix', desc: 'Chaque coup infligé vous gagnez 15 de vitesse', unlockRound: 10, maxRound: 49, onAttack: (ctx) => {ctx.player.speed += 15; ctx.player.stacks.kleenex = (ctx.player.stacks.kleenex || 0) + 1;},},
    { id: 'endurancebreaker', name: 'Briseur d’Endurance', desc: "À chaque attaque infligée au même adversaire, vos dégâts augmentent de 2% (reset après sa mort).", unlockRound: 15, maxRound: 51, onAttack: (ctx) => { if (!ctx.player.stacks) ctx.player.stacks = 0; ctx.player.stacks += 0.02;}, onDamage: (ctx, dmg) => { return Math.floor(dmg * (1 + (ctx.player.stacks || 0))); }, onKill: (ctx) => { ctx.player.stacks = 0;} },
   
   

{ id: 'stoneheart', name: 'Cœur de Pierre', desc: "Vous gagnez +1% PV Max à chaque coup reçu (max 30%)", unlockRound: 10, maxRound: 49, onHit: (ctx, dmg) => { ctx.player.stacks.stoneheart = (ctx.player.stacks.stoneheart || 0); if (ctx.player.stacks.stoneheart < 30) { ctx.player.maxHP = Math.floor(ctx.player.maxHP * 1.01); ctx.player.stacks.stoneheart++; } } },


//              ITEMS ATYPIQUES
//
//              Manche 50 -> 99


    { id: 'aze72', name: 'Fusil Imperial AZE72', desc: "Chaque attaque infligée vous auguemente votre energie de 20",unlockRound: 50, maxRound: 99, onAttack: (ctx) => { ctx.player.energie += 20; ctx.player.stacks.aze72 = (ctx.player.stacks.aze72 || 0) + 1;} },
    { id: 'hyperviolent', name: 'Lame hyperviolente', desc: "+50% Crit<br>+100 Suppr.Reel<br>x2 Force",unlockRound: 50, maxRound: 99, apply: (ctx) => { ctx.player.force *= 2; ctx.player.crit += 50; ctx.player.supReal += 100;} },
    { id: 'spec', name: 'Racine Sucrée', desc: "Vous gagnez un bonus de PV Max équivalent à 50% votre pourcentage de critiques.", unlockRound: 50, maxRound: 99, apply: (ctx) => { const bonus = Math.round(ctx.player.maxHP * ((ctx.player.crit / 100) / 2)); ctx.player.maxHP += bonus; ctx.player.hp += bonus; } },
    { id: 'miracle', name: 'Voile Miracle', desc: "+200 Res. Spe<br>+200 Res.Reel<br>+200 Res. Globale",unlockRound: 50, maxRound: 99, apply: (ctx) => { ctx.player.resSpec += 200;ctx.player.resReal += 200;ctx.player.resGlob += 200;} },
    { id: 'spikefruit', name:'Fruit épineux', desc:'Vous gagnez de la force équivalent à 10% de vos PVMax',  unlockRound: 50, maxRound: 99, apply: (ctx) => { ctx.player.force += (0.1 * ctx.player.maxHP)},},
    { id: 'lancetrans', name: 'Lance Transperçante', desc: 'Vous gagnez 20% de votre Force en Suppr Réelle', unlockRound: 50, maxRound: 99, apply: (ctx,dmg) => { ctx.player.supReal += (ctx.player.force / 5)}},
    { id: 'bloodmoon', name: 'Lame de la Lune Sanglante', desc: "Chaque coup infligé vous soigne de 15% des dégâts infligés", unlockRound: 50, maxRound: 99, onDamage: (ctx, dmg) => { const heal = Math.floor(dmg * 0.15); ctx.player.hp = clamp(ctx.player.hp + heal, 0, ctx.player.maxHP); return dmg; } },
    { id: 'timewarp', name: 'Sablier du Paradoxe', desc: "Tous les 3 tours, vous regagnez 20% de vos PV Max", unlockRound: 50, maxRound: 99, onKill: (ctx) => { ctx.player.stacks.timewarp = (ctx.player.stacks.timewarp || 0) + 1; if (ctx.player.stacks.timewarp % 3 === 0) { const heal = Math.floor(ctx.player.maxHP * 0.2); ctx.player.hp = clamp(ctx.player.hp + heal, 0, ctx.player.maxHP); } } },
    { id: 'overdrive', name: 'Surcharge Instable', desc: "Double vos dégâts infligés mais vous perdez 5% de vos PV Max à chaque attaque", unlockRound: 50, maxRound: 99, onAttack: (ctx) => { ctx.player.maxHP = Math.max(1, Math.floor(ctx.player.maxHP * 0.95)); if (ctx.player.hp > ctx.player.maxHP) ctx.player.hp = ctx.player.maxHP; }, onDamage: (ctx, dmg) => { return dmg * 2; } },
    { id: 'soulharvest', name: 'Moissonneuse d’âmes', desc: "À chaque ennemi tué : +5 Force et +5 Énergie (stack infini)", unlockRound: 50, maxRound: 99, onKill: (ctx) => { ctx.player.force += 5; ctx.player.energie += 5; ctx.player.stacks.soulharvest = (ctx.player.stacks.soulharvest || 0) + 1; } },
    { id: 'phoenixfeather', name: 'Plume du Phénix', desc: "La première fois que vous mourrez, vous ressuscitez avec 50% de vos PV Max (1 fois par run)", unlockRound: 50, maxRound: 99, onDeath: (ctx) => { if (!ctx.player.stacks.phoenixfeather) { ctx.player.stacks.phoenixfeather = 1; ctx.player.hp = Math.floor(ctx.player.maxHP * 0.5); return false; } return true; } },



   

{ id: 'eternalflame', name: 'Flamme Éternelle', desc: "À chaque tour, gagnez +5 Force et +5 Énergie (stack infini)", unlockRound: 50, maxRound: 99, onKill: (ctx) => { ctx.player.force += 5; ctx.player.energie += 5; ctx.player.stacks.eternalflame = (ctx.player.stacks.eternalflame || 0) + 1; } },

{ id: 'colossusarmor', name: 'Armure du Colosse', desc: "Vous réduisez tous les dégâts subis de 15%, mais votre vitesse est réduite de 30%", unlockRound: 50, maxRound: 98, apply: (ctx) => { ctx.player.speed = Math.floor(ctx.player.speed * 0.7); }, onDamageTaken: (ctx, dmg) => { return Math.floor(dmg * 0.85); } },

{ id: 'manashield', name: 'Bouclier de Mana', desc: "Quand vous subissez des dégâts, 50% sont absorbés par votre énergie au lieu de vos PV", unlockRound: 50, maxRound: 98, onHit: (ctx, dmg) => { const manaDmg = Math.floor(dmg * 0.5); if (ctx.player.energie >= manaDmg) { ctx.player.energie -= manaDmg; return Math.floor(dmg * 0.5); } return dmg; } },

{ id: 'stormbringer', name: 'Porte-Tempête', desc: "Chaque attaque a 20% de chance d’électrocuter l’ennemi, infligeant 10% de ses PV actuels en dégâts bruts", unlockRound: 50, maxRound: 98, onAttack: (ctx) => { if (Math.random() < 0.2) { const shock = Math.floor(ctx.monster.hp * 0.1); ctx.monster.hp = clamp(ctx.monster.hp - shock, 0, ctx.monster.maxHP); } } },

//              OBJETS MAUDITS
//
//              Manche 100 -> 1



{ id: 'cleanser', name: 'Dague Purificatrice', desc: "Supprime immédiatement tous vos autres objets mais garde vos statistiques", unlockRound: 98, maxRound: 102, apply: (ctx) => { ctx.player.passives = []; ctx.player.stacks = {}; } },
{ id: 'cleanser', name: 'Sceptre Purificatrice', desc: "Supprime immédiatement tous vos autres objets mais garde vos statistiques", unlockRound: 98, maxRound: 102, apply: (ctx) => { ctx.player.passives = []; ctx.player.stacks = {}; } },
{ id: 'cleanser', name: 'Fruit Purificateur', desc: "Supprime immédiatement tous vos autres objets mais garde vos statistiques", unlockRound: 98, maxRound: 102, apply: (ctx) => { ctx.player.passives = []; ctx.player.stacks = {}; } },
{ id: 'cleanser', name: 'Voile Purificatrice', desc: "Supprime immédiatement tous vos autres objets mais garde vos statistiques", unlockRound: 98, maxRound: 102, apply: (ctx) => { ctx.player.passives = []; ctx.player.stacks = {}; } },




    ]