import { BH_UPGRADES } from "./black-hole"
import { MLT_UPGRADES } from "./mlt/multiverse"

export const UPGRADES = {
    'm1': {
        unl: ()=>hasUpgrade('bh3') || player.ranks[0].gte(1),
        mass: true,
        get description() { return `Increase the base of normal mass by <b>+${this.base.format()}</b> per level.` },

        curr: "mass",
        cost: a => a.pow_base(player.ranks[0].gte(2) ? 1.25 : 1.5).mul(10).div(upgradeEffect('m4')).max(1),
        bulk: a => a.mul(upgradeEffect('m4')).div(10).log(player.ranks[0].gte(2) ? 1.25 : 1.5).floor().add(1),

        get bonus() { return simpleUpgradeEffect('r5',0) },
        get base() {
            let b = DC.D1
            if (player.ranks[0].gte(3)) b = b.add(player.upgrades.m1.div(10))
            b = b.mul(upgradeEffect('m2'))
            return b
        },
        effect(a) {
            let x = a.mul(this.base)
            return x
        },
        effDesc: x => `+${format(x)}`,
    },
    'm2': {
        unl: ()=>hasUpgrade('bh3') || player.ranks[0].gte(2),
        mass: true,
        get description() { return `Increase the base of <b>m1</b> upgrade by <b>+${formatPercent(this.base)}</b> per level.` },

        curr: "mass",
        cost: a => a.pow_base(player.ranks[0].gte(3) ? 2 : 3).mul(100).div(upgradeEffect('m4')).max(1),
        bulk: a => a.mul(upgradeEffect('m4')).div(100).log(player.ranks[0].gte(3) ? 2 : 3).floor().add(1),

        get bonus() { return simpleUpgradeEffect('r5',0) },
        get base() {
            let b = DC.D1
            if (player.ranks[0].gte(5)) b = b.add(player.upgrades.m2.div(10))
            return b
        },
        effect(a) {
            let x = a.mul(this.base).add(1).pow(upgradeEffect('m3'))
            return x
        },
        effDesc: x => formatMult(x),
    },
    'm3': {
        unl: ()=>hasUpgrade('bh3') || player.ranks[0].gte(3),
        mass: true,
        get description() { return `Increase the exponent of the effect of <b>m2</b> upgrade by <b>+${formatPercent(this.base)}</b> per level.` },

        curr: "mass",
        cost: a => a.sumBasePO(temp.upg.m3_fp).pow(1.25).pow_base(player.ranks[0].gte(4) ? 6 : 9).mul(1e3).div(upgradeEffect('m4')).max(1),
        bulk: a => a.mul(upgradeEffect('m4')).div(1e3).log(player.ranks[0].gte(4) ? 6 : 9).root(1.25).sumBasePO(temp.upg.m3_fp,true).floor().add(1),

        get bonus() { return Decimal.add(simpleUpgradeEffect('r5',0),simpleUpgradeEffect('mlt2',0)).add(simpleUpgradeEffect('mlt5')) },
        get strength() { return hasAchievement(16) ? 1.1 : 1 },
        get base() {
            let b = Decimal.add(0.5,simpleUpgradeEffect('r3',0))
            if (player.ranks[0].gte(32)) b = b.add(.1);
            if (player.ranks[2].gte(2)) b = b.add(player.upgrades.m3.div(100));
            return b
        },
        effect(a) {
            let x = a.mul(this.base).add(1)
            return x
        },
        effDesc: x => formatPow(x),
    },
    'm4': {
        unl: ()=>hasUpgrade('bh3'),
        mass: true,
        get description() { return `The first three mass upgrades are <b>${formatMult(this.base)}</b> cheaper per level.` },

        curr: "mass",
        cost: a => a.sumBasePO(hasUpgrade('mlt4')?.00018:.001).pow_base(3).mul(1e3),
        bulk: a => a.div(1e3).log(3).sumBasePO(hasUpgrade('mlt4')?0.00018:.001,true).floor().add(1),

        get base() {
            let b = Decimal.add(2,simpleUpgradeEffect('r7',0))
            return b
        },
        effect(a) {
            let x = a.pow_base(this.base)
            return x
        },
        effDesc: x => formatMult(x.pow(-1)),
    },

    'r1': {
        unl: ()=>player.rage.unlocked,
        get description() { return `Increase the normal mass by <b>${formatMult(this.base)}</b> per level, based on your normal mass.` },

        curr: "rage",
        cost: a => a.sumBase(1.01).pow_base(2).div(simpleAchievementEffect(24)).max(1),
        bulk: a => a.mul(simpleAchievementEffect(24)).log(2).sumBase(1.01,true).floor().add(1),

        get bonus() { return upgradeEffect('mlt2',0) },
        get strength() { return rankEffect(2,2) },
        get base() {
            let b = player.mass.add(10).log10().root(2).mul(rankEffect(1,4)).mul(rankEffect(0,7))
            return b
        },
        effect(a) {
            let x = this.base.pow(a)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'r2': {
        max: 1,

        unl: ()=>player.rage.unlocked,
        get description() { return `Automate mass upgrades without spending any resources.` },

        curr: "rage",
        cost: a => 1e6,
    },
    'r3': {
        max: 1,

        unl: ()=>player.rage.unlocked,
        get description() { return `Unspent rage powers increase the base of <b>m3</b> upgrade at a reduced rate.` },

        curr: "rage",
        cost: a => 1e10,

        effect(a) {
            let x = player.rage.powers.add(10).log10().log10().div(10)
            if (hasUpgrade('bh10')) x = x.max(expPow(player.rage.powers.add(1).log10(),0.5).div(15));
            if (hasUpgrade('r6')) x = x.mul(3);
            return x
        },
        effDesc: x => "+"+format(x,4),
    },
    'r4': {
        max: 1,

        unl: ()=>player.rage.unlocked,
        get description() { return `Automatically update Tier.` },

        curr: "rage",
        cost: a => 1e12,
    },
    'r5': {
        max: 1,

        unl: ()=>player.rage.unlocked,
        get description() { return `The <b>r1</b> upgrade adds bonus <b>m1-3</b> upgrades at a reduced rate.` },

        curr: "rage",
        cost: a => 1e15,

        effect(a) {
            let x = player.upgrades.r1.add(1).log(4).pow(2).div(1.5)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'r6': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `The <b>r3</b> upgrade is <b>thrice</b> stronger.` },

        curr: "rage",
        cost: a => 1e21,
    },
    'r7': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `The normal mass increases the base of <b>m4</b> upgrade as a base of <b>r1</b>.` },

        curr: "rage",
        cost: a => 1e30,

        effect(a) {
            let x = player.mass.add(1).log10().root(3)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'r8': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `Improve the formula of rage power's base.` },

        curr: "rage",
        cost: a => 1e42,
    },
    'r9': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `The <b>m4</b> upgrade affects the rank requirement.` },

        curr: "rage",
        cost: a => 1e72,
    },
    'r10': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `The black hole is boosted by unspent rage powers.` },

        curr: "rage",
        cost: a => 1e120,

        effect(a) {
            let x = expPow(player.rage.powers,0.5).pow(2)
            return x
        },
        effDesc: x => formatMult(x),
    },

    ...BH_UPGRADES,
    ...MLT_UPGRADES,
}

export const UPG_KEYS = Object.keys(UPGRADES)

export const UPG_GROUPS = {
    'mass': ['m1','m2','m3','m4'],
    'rage': ['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10'],
    'bh': ['bh1','bh2','bh3','bh4','bh5','bh6','bh7','bh8','bh9','bh10','bh11','bh12','bh13'],
    'mlt': ['mlt1','mlt2','mlt3','mlt4','mlt5'],
}

export const AUTO_UPG_GROUPS = {
    'mass': () => hasUpgrade('r2'),
    'rage': () => hasUpgrade('bh5'),
    'bh': () => player.mlt.times.gte(4),
}

export function hasUpgrade(id,lvl=1) { return player.upgrades[id].gte(lvl) }
export function upgradeEffect(id,def=1) { return temp.upgrade_effects[id] ?? def }
export function simpleUpgradeEffect(id,def=1) { return hasUpgrade(id) ? temp.upgrade_effects[id] ?? def : def }

export function buyUpgrade(id,bulk=false,auto=false) {
    const u = UPGRADES[id], curr = CURRENCIES[u.curr], max = u.max ?? EINF, lvl = player.upgrades[id];
    bulk &&= max > 1;
    var cost;

    if (u.unl() && lvl.lt(max) && curr.amount.gte(cost = u.cost(lvl))) {
        let b = lvl.add(1);

        if (bulk) {
            b = b.max(u.bulk?.(curr.amount) ?? 1);
            cost = u.cost(b.sub(1));
        }

        if (!auto) curr.amount = curr.amount.sub(cost).max(0);
        player.upgrades[id] = b
    }
}

export function resetUpgrades(list=[],keep=[]) {
    for (let id of list) if (!keep.includes(id)) player.upgrades[id] = E(0);
}
export function resetUpgradesByGroup(id,keep) { resetUpgrades(UPG_GROUPS[id],keep) }

createTempUpdate("updateUpgradesTemp", ()=>{
    temp.auto_upgs_unlocked = {}

    for (let group_id in AUTO_UPG_GROUPS) if (AUTO_UPG_GROUPS[group_id]()) for (let id of UPG_GROUPS[group_id]) temp.auto_upgs_unlocked[id] = true;

    temp.upg.m3_fp = Decimal.mul(player.ranks[1].gte(3) ? .05 : .1, simpleUpgradeEffect('mlt3'))

    for (let [id,u] of Object.entries(UPGRADES)) {
        var level = player.upgrades[id].add(u.bonus ?? 0).mul(u.strength ?? 1);

        if (!u.unl()) level = E(0);

        if (u.effect) temp.upgrade_effects[id] = u.effect(level);
    }
})