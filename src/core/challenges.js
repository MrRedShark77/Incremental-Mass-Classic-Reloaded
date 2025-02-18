import { format, formatMass, formatPercent } from "./format"

export const CHAL_RESOURCES = {
    placeholder: {
        name: "",
        get amount() { return DC.D0 },
        format: format,
    },
    mass: {
        name: "of normal mass",
        get amount() { return player.mass },
        format: formatMass,
    },
    bh: {
        name: "of black hole",
        get amount() { return player.bh.mass },
        format: formatMass,
    },
    L1: {
        name: "total L1 challenge completions",
        get amount() {
            let x = DC.D0
            for (let id of CHALLENGES_MAP[1]) x = x.add(player.chal.completions[id]);
            return x
        },
        format: x=>format(x,0),
    },
}

export const CHALLENGES = {
    '1-1': {
        name: "Alpha",
        symbol: "α",
        layer: 1,

        get desc() { return `Ranks scale <b>${formatMult(3)}</b> faster.` },

        res: "mass",
        goal: a => a.pow_base(1.02).mul(25000).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(25000).log(1.02).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('2-5'),simpleAchievementEffect(56)).mul(simpleUpgradeBoost('bmlt4',temp.break_mlt_effect[0])).mul(challengeEffect('3-6')) },
        effect(c) {
            let x = c.mul(.01).add(1)
            return x
        },
        reward: x => `The <b>m1-4</b> upgrades are <b>${formatPercent(x.sub(1))}</b> stronger.`,
    },
    '1-2': {
        name: "Beta",
        symbol: "β",
        layer: 1,

        get desc() { return `You cannot purchase any mass upgrades.` },

        res: "mass",
        goal: a => a.pow_base(1.02).mul(25000).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(25000).log(1.02).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('2-5'),simpleAchievementEffect(56)).mul(simpleUpgradeBoost('bmlt4',temp.break_mlt_effect[0])).mul(challengeEffect('3-6')) },
        effect(c) {
            let x = c.mul(.01).add(1).pow(2)
            return x
        },
        reward: x => `The <b>r1</b> upgrade is <b>${formatPercent(x.sub(1))}</b> stronger.`,
    },
    '1-3': {
        name: "Gamma",
        symbol: "γ",
        layer: 1,

        get desc() { return `The normal mass is reduced by <b>^0.1</b>.` },

        res: "mass",
        goal: a => a.pow_base(1.05).mul(4000).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(4000).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('2-5'),simpleAchievementEffect(56)).mul(simpleUpgradeBoost('bmlt4',temp.break_mlt_effect[0])).mul(challengeEffect('3-6')) },
        effect(c) {
            let x = c.div(50).add(1).root(2)
            return x
        },
        reward: x => `<b>${formatPow(x,4)}</b> to the normal mass.`,
    },
    '1-4': {
        name: "Delta",
        symbol: "δ",
        layer: 1,

        get desc() { return `Rage powers are reduced by <b>^0.1</b>.` },

        res: "mass",
        goal: a => a.pow_base(1.05).mul(40000).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(40000).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('2-5'),simpleAchievementEffect(56)).mul(simpleUpgradeBoost('bmlt4',temp.break_mlt_effect[0])).mul(challengeEffect('3-6')) },
        effect(c) {
            let x = c.div(50).add(1).root(2)
            return x
        },
        reward: x => `<b>${formatPow(x,4)}</b> to rage powers.`,
    },

    '2-1': {
        name: "Epsilon",
        symbol: "ε",
        layer: 2,

        get desc() { return `You cannot Rank up.` },

        res: "mass",
        goal: a => a.pow_base(1.1).mul(1e5).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e5).log(1.1).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            let x = c.div(5).add(1).root(2)
            return x
        },
        reward: x => `Rank scales <b>${formatMult(x,4)}</b> weaker.`,
    },
    '2-2': {
        name: "Zeta",
        symbol: "ζ",
        layer: 2,

        get desc() { return `You cannot purchase any rage upgrades.` },

        res: "mass",
        goal: a => a.pow_base(1.05).mul(5e5).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(5e5).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            let x = c.mul(.01).add(1).pow(2)
            return x
        },
        reward: x => `The <b>bh1</b> upgrade is <b>${formatPercent(x.sub(1))}</b> stronger.`,
    },
    '2-3': {
        name: "Eta",
        symbol: "η",
        layer: 2,

        get desc() { return `Rage powers cannot be earned. You will earn dark matter from the normal mass instead, based on the rage power’s exponent.` },

        res: "mass",
        goal: a => a.pow_base(1.05).mul(5e5).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(5e5).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            if (c.eq(0)) return DC.D0;
            let x = c.add(2).slog(2).pow(3).sub(1).div(500)
            return x
        },
        reward: x => `Increase the exponent of rage power’s base by <b>+${format(x,4)}</b>.`,
    },
    '2-4': {
        name: "Theta",
        symbol: "θ",
        layer: 2,

        get desc() { return `All black hole resources are reduced by <b>^0.1</b>.` },

        res: "bh",
        goal: a => a.pow_base(1.05).mul(400).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(400).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            let x = c.div(50).add(1).root(2)
            return x
        },
        reward: x => `<b>${formatPow(x,4)}</b> to all black hole resources.`,
    },
    '2-5': {
        name: "Iota",
        symbol: "ι",
        layer: 2,
        trap: ['1-1','1-2','1-3','1-4'],

        get desc() { return `Layer 1 challenges are activated/trapped once.<br><i>Note: Trapped challenges can be completed <b>AUTOMATICALLY</b> up to the best completions you beat.</i>` },

        res: "mass",
        goal: a => a.scale(25,75,"DA").pow_base(1.1).mul(DC.LOG10_MAX_VALUE).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(DC.LOG10_MAX_VALUE).log(1.1).add(1).scale(25,75,"DA",true).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            let x = c.div(10).add(1).root(2)
            return x
        },
        reward: x => `Layer 1 challenges’ reward is <b>${formatPercent(x.sub(1))}</b> stronger.`,
    },

    '3-1': {
        name: "Kappa",
        symbol: "κ",
        layer: 3,

        get desc() { return `The exponent of normal mass and black hole is reduced by <b>^0.5</b>.` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e5).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e5).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.mul(.3).add(1).root(3)
            return x
        },
        reward: x => `The base of <b>mlt1</b> & <b>bmlt1</b> upgrades is increased by <b>${formatMult(x,4)}</b>.`,
    },
    '3-2': {
        name: "Lambda",
        symbol: "λ",
        layer: 3,
        trap: ['1-2','2-2'],

        get desc() { return `You cannot purchase any black hole upgrades. The <b>β</b> and <b>ζ</b> challenges are activated once. Additionally, the exponent of normal mass and black hole is reduced by <b>^0.75</b>.` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e6).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e6).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.mul(.3).add(1).root(3)
            return x
        },
        reward: x => `The base of <b>m3</b> & <b>m5</b> upgrades is increased by <b>${formatMult(x,4)}</b>.`,
    },
    '3-3': {
        name: "Mu",
        symbol: "μ",
        layer: 3,
        trap: ['1-3','1-4','2-4'],
        
        get desc() { return `The <b>γ</b>, <b>δ</b>, and <b>θ</b> challenges are activated once, and their nerf is <b>twice</b> stronger.` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e7).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e7).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.mul(.3).add(1).root(3)
            return x
        },
        reward: x => `The <b>bh2</b> upgrade is <b>${formatPercent(x.sub(1))}</b> stronger.`,
    },
    '3-4': {
        name: "Nu",
        symbol: "ν",
        layer: 3,
        trap: ['2-3'],

        get desc() { return `All black hole resources cannot be earned nor generated. The <b>η</b> challenge is activated too. Additionally, the exponent of normal mass is reduced by <b>^0.75</b>.` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e6).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e6).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            if (c.eq(0)) return DC.D0;
            let x = c.add(2).slog(2).pow(3).sub(1).div(500)
            return x
        },
        reward: x => `Increase the exponent of the second effect of the black hole and anti-black hole by <b>+${format(x,4)}</b>.`,
    },
    '3-5': {
        name: "Xi",
        symbol: "ξ",
        layer: 3,
        trap: ['2-1'],
        
        get desc() { return `The <b>m1-4</b>, <b>r1</b>, and <b>bh1-2</b> upgrades’ strength is always <b>1%</b>. The <b>ε</b> challenge is activated too.` },
        
        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e6).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e6).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.mul(0.3).add(1).root(3)
            return x
        },
        reward: x => `Multiversal energy & fragment generations are <b>${formatPercent(x.sub(1))}</b> stronger.`,
    },
    '3-6': {
        name: "Omicron",
        symbol: "ο",
        layer: 3,
        trap: ['1-1','1-2','1-3','1-4','2-1','2-2','2-3','2-4','2-5'],
        
        get desc() { return `Layer 1–2 challenges are activated once. Additionally, the exponent of normal mass and black hole is reduced by <b>^0.75</b>.` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e10).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e10).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.div(15).add(1).root(3)
            return x
        },
        reward: x => `Layer 1-2 challenges’ reward is <b>${formatPercent(x.sub(1))}</b> stronger.`,
    },

    /*
    '1-3': {
        name: "Gamma",
        symbol: "γ",
        layer: 1,

        get desc() { return `` },

        effect(c) {
            let x = DC.D1
            return x
        },
        reward: x => ``,
    },
    */
}

export const CHALLENGES_MAP = [
    null,
    ['1-1','1-2','1-3','1-4'],
    ['2-1','2-2','2-3','2-4','2-5'],
    ['3-1','3-2','3-3','3-4','3-5','3-6'],
]
export const CHALLENGE_LAYERS = CHALLENGES_MAP.length-1

export const SET_BEST_CHAL = [
    null,
    () => player.mlt.times.gte(20),
    () => player.mlt.times.gte(60),
]
export const AUTO_CHAL = [
    null,
    () => player.mlt.times.gte(24),
]

export function getActiveChallenge(layer) {
    for (let C of CHALLENGES_MAP[layer]) if (player.chal.active[C]) return C;
    return null;
}

export function insideChallenge(id) { return temp.trapped_chal[id] || player.chal.active[id] }

export function checkIsChallengeOutside() {
    for (let C in CHALLENGES) if (insideChallenge(C)) return false;
    return true;
}

export function enterChallenge(c) {
    const C = CHALLENGES[c]
    let active = getActiveChallenge(C.layer)

    if (active) {
        const CA = CHALLENGES[active], CRA = CHAL_RESOURCES[CA.res]

        player.chal.active[active] = false

        if (CRA.amount.gte(CA.goal(player.chal.completions[active]))) {
            player.chal.best[active] = player.chal.best[active].max(player.chal.completions[active] = player.chal.completions[active].add(1).max(CA.bulk(CRA.amount)));
            giveAchievement(44)
        }

        if (active === "2-1" && !hasNonQoLUpgradesByGroup('mass') && !hasNonQoLUpgradesByGroup('rage') && !hasNonQoLUpgradesByGroup('bh') && player.mass.gte('1.5e4056')) giveAchievement(53);
    }

    for (let l = 1; l < C.layer; l++) {
        let a = getActiveChallenge(l)
        if (a) player.chal.active[a] = false;
    }

    if (getChallengeLayersUnlocked() >= C.layer) {
        if (active !== c) {
            player.chal.active[c] = true
        }
    
        switch (C.layer) {
            case 1: {
                RESETS['dark-matter'].doReset()
                break
            }
            case 2: {
                RESETS.multiverse.doReset(true)
                break
            }
            case 3: {
                resetChallengeLayers(2)
                resetUpgradesByGroup('mlt')
                player.mlt.energy = DC.D0, player.mlt.total_energy = DC.D0
                RESETS.multiverse.doReset(true)
                break
            }
        }

        if (temp.trapped_chal[c]) giveAchievement(55);
    }

    if (checkIsChallengeOutside()) for (let l = 1; l <= CHALLENGE_LAYERS; l++) if (SET_BEST_CHAL[l]?.()) for (let C of CHALLENGES_MAP[l]) player.chal.completions[C] = E(player.chal.best[C]);
}

export function getChallengeLayersUnlocked() {
    return 1+player.mlt.times.gte(11)+player.mlt.times.gte(31)
}
export function challengeEffect(id,def=1) { return temp.chal_effect[id] ?? def }
export function resetChallengeLayers(layer) { for (let l = 1; l <= layer; l++) for (let C of CHALLENGES_MAP[l]) player.chal.completions[C] = DC.D0; }

createTempUpdate("updateChallengesTemp", ()=>{
    for (let id in CHALLENGES) {
        const C = CHALLENGES[id]

        var lvl = player.chal.completions[id], str = C.strength ?? 1

        if ('effect' in C) temp.chal_effect[id] = C.effect(lvl.mul(str));
    }
})