export const MULTIVERSE = {
    get level() { return player.mlt.times },

    require(l=this.level) {
        let x = l.sumBase(1.01).pow(1.25).pow_base(1.44).mul(7).pow_base(DC.MAX_VALUE).mul(1.5e56)
        return x
    },
    get bulk() {
        let x = player.mass.div(1.5e56).log(DC.MAX_VALUE).div(7).log(1.44).root(1.25).sumBase(1.01,true).add(1).floor()
        return x
    },

    get effect() {
        let e = player.mlt.total_energy, x = []

        x[0] = e.add(10).log10().root(2).sub(1).div(10).add(1)

        return x
    },

    milestones: [
        [1, `Unlock the multiversal energy generation permanently.`],
        [2, `Unlock the third Rank called <b>Tetr</b>.`],
        [3, `Keep the <b>bh3</b> upgrade on reset. Automatically update <b>Tetr</b>.`],
        [4, `Keep the <b>bh8</b> upgrade on reset, and it affects the third effect of the anti-black hole. Automate the black hole upgrades without spending any resources.`],
        [6, `The base of multiversal energy generation is <b>squared</b>.`],
        [7, `Unlock the <b>Challenge</b>.`],
        [9, `Keep the <b>bh7</b> upgrade on reset. Passively generate 100% of your dark matter gained on reset.`],
        [11, `Unlock the second layer of <b>Challenge</b>.`],
    ],
}

export const MLT_UPGRADES = {
    'mlt1': {
        unl: ()=>player.mlt.unlocked,
        get description() { return `Increase multiversal energy generation by <b>${formatMult(this.base)}</b> per level.` },

        curr: "mlt-energy",
        cost: a => a.sumBase(1.01).pow_base(3.5).mul(10),
        bulk: a => a.div(10).log(3.5).sumBase(1.01,true).floor().add(1),

        get strength() { return simpleAchievementEffect(53) },
        get base() {
            let b = Decimal.add(2,simpleUpgradeEffect('mlt11',0))
            return b
        },
        effect(a) {
            let x = this.base.pow(a)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'mlt2': {
        unl: ()=>player.mlt.unlocked,
        get description() { return `Gain <b>+${format(this.base)}</b> bonus levels of the <b>m3</b>, <b>r1</b>, and <b>bh1-2</b> upgrades per level.` },

        curr: "mlt-energy",
        cost: a => a.sumBase(1.1).pow_base(5).mul(100),
        bulk: a => a.div(100).log(5).sumBase(1.1,true).floor().add(1),

        get strength() { return simpleAchievementEffect(53) },
        get base() {
            let b = 1
            return b
        },
        effect(a) {
            let x = a.mul(this.base)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'mlt3': {
        max: 1,

        unl: ()=>player.mlt.times.gte(2),
        get description() { return `Total multiversal energy reduces the scaling of the <b>m3</b> upgrade.` },

        curr: "mlt-energy",
        cost: a => E(1e4),

        effect(a) {
            let x = player.mlt.total_energy.add(10).log10().log10().div(10).add(1).pow(-1)
            return x
        },
        effDesc: x => formatMult(x,4),
    },
    'mlt4': {
        max: 1,

        unl: ()=>player.mlt.times.gte(3),
        get description() { return `The <b>m4</b> upgrade scales <b>${formatMult(50/9)}</b> slower.` },

        curr: "mlt-energy",
        cost: a => E(1e6),
    },
    'mlt5': {
        max: 1,

        unl: ()=>player.mlt.times.gte(4),
        get description() { return `Add bonus <b>m3</b> upgrade by <b>+1</b> per <b>Tier</b>.` },

        curr: "mlt-energy",
        cost: a => E(1e11),

        effect(a) {
            let x = player.ranks[1]
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'mlt6': {
        max: 1,

        unl: ()=>player.mlt.times.gte(5),
        get description() { return `The <b>"I ate without cheapness"</b> achievement affects the <b>bh1-2</b> upgrades normally.` },

        curr: "mlt-energy",
        cost: a => E(1e13),
    },
    'mlt7': {
        max: 1,

        unl: ()=>player.mlt.times.gte(6),
        get description() { return `The <b>bh2</b> upgrade strengthens the <b>bh1</b> upgrade.` },

        curr: "mlt-energy",
        cost: a => E(1e26),

        effect(a) {
            let x = getTotalUpgrades('bh2').div(50).add(1)
            return x
        },
        effDesc: x => formatPercent(x.sub(1)),
    },
    'mlt8': {
        max: 1,

        unl: ()=>player.mlt.times.gte(6),
        get description() { return `The multiversal energy's effect affects rage powers.` },

        curr: "mlt-energy",
        cost: a => 1e30,
    },
    'mlt9': {
        max: 1,

        unl: ()=>player.mlt.times.gte(7),
        get description() { return `Product of challenge completions multiplies multiversal energy generation.` },

        curr: "mlt-energy",
        cost: a => 1e36,

        effect(a) {
            let x = DC.D1
            for (let id in CHALLENGES) x = x.mul(player.chal.completions[id].add(1))
            return x
        },
        effDesc: x => formatMult(x),
    },
    'mlt10': {
        max: 1,

        unl: ()=>player.mlt.times.gte(9),
        get description() { return `The multiversal energy's effect affects mass of the black hole.` },

        curr: "mlt-energy",
        cost: a => 1e54,
    },
    'mlt11': {
        max: 1,

        unl: ()=>player.mlt.times.gte(10),
        get description() { return `Multiverse increases the base of <b>mlt1</b> upgrade.` },

        curr: "mlt-energy",
        cost: a => 1e66,

        effect(a) {
            let x = player.mlt.times.mul(0.1)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'mlt12': {
        max: 1,

        unl: ()=>player.mlt.times.gte(11),
        get description() { return `The multiversal energy's effect affects mass of the anti-black hole.` },

        curr: "mlt-energy",
        cost: a => 1e100,
    },
    'mlt13': {
        max: 1,

        unl: ()=>player.mlt.times.gte(14),
        get description() { return `Product of ranks multiplies multiversal energy generation.` },

        curr: "mlt-energy",
        cost: a => 1e144,

        effect(a) {
            let x = DC.D1
            for (let id in RANKS) x = x.mul(player.ranks[id].add(1))
            return expPow(x,1.5)
        },
        effDesc: x => formatMult(x),
    },
}

createTempUpdate("updateMultiverseTemp", ()=>{
    temp.mlt_effect = MULTIVERSE.effect
})