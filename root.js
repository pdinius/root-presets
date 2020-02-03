const dict = {
	marquise_de_cat: {
    reach: 10,
    toggle: false,
  },
  underground_duchy: {
    reach: 8,
    toggle: false,
  },
  eyrie_dynasties: {
    reach: 7,
    toggle: false,
  },
  vagabond_A: {
    reach: 5,
    toggle: false,
  },
  riverfolk_company: {
    reach: 5,
    toggle: false,
  },
  woodland_alliance: {
    reach: 3,
    toggle: false,
  },
  corvid_conspiracy: {
    reach: 3,
    toggle: false,
  },
  vagabond_B: {
    reach: 2,
    toggle: false,
  },
  lizard_cult: {
    reach: 2,
    toggle:false,
  },
}
const fact_list = Object.keys(dict)
const thresh = {
	2: 17, 3: 18, 4: 21, 5: 25, 6: 28,
}

const get_suggestions = (players, factions = [], total, start = 0) => {
    total = total || factions.reduce((a,b) => a + dict[b].reach, 0)
  
    let res = []

    for (let i = start; i < fact_list.length; ++i) {
  	    if (fact_list.length - i + factions.length < players) return res
        if (fact_list[i] === 'vagabond_B' && !factions.includes('vagabond_A')) continue
        if (factions.includes(fact_list[i])) continue
        if (factions.length === players - 1) {
    	    if (dict[fact_list[i]].reach + total >= thresh[players]) res.push(factions.concat(fact_list[i]))	
        } else {
        	res = res.concat(get_suggestions(players, factions.concat(fact_list[i]), total + dict[fact_list[i]].reach, start + 1))
        }
    }
  
     return res
}
console.log(get_suggestions(5,['riverfolk_company']))

module.exports = get_suggestions