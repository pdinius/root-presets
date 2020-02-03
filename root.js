const dict = {
	marquise_de_cat: 10,
  underground_duchy: 8,
  eyrie_dynasties: 7,
  vagabond_A: 5,
  riverfolk_company: 5,
  woodland_alliance: 3,
  corvid_conspiracy: 3,
  vagabond_B: 2,
  lizard_cult: 2
}

const fact_list = Object.keys(dict)

const thresh = {
	2: 17,
  3: 18,
  4: 21,
  5: 25,
  6: 28
}

const get_suggestions = (players, factions = [], total) => {
    total = total || factions.reduce((a,b) => a + dict[b], 0)
  
    let res = []
    let start = Math.max(-1, ...factions.map(v => fact_list.indexOf(v))) + 1

    for (let i = start; i < fact_list.length; ++i) {
  	    if (fact_list.length - i + factions.length < players) return res
  	    if (fact_list[i] === 'vagabond_B' && !factions.includes('vagabond_A')) continue
        if (factions.length === players - 1) {
    	    if (dict[fact_list[i]] + total >= thresh[players]) res.push(factions.concat(fact_list[i]))	
        } else {
        	res = res.concat(get_suggestions(players, factions.concat(fact_list[i]), total + dict[fact_list[i]]))
        }
    }
  
     return res
}

module.exports = get_suggestions