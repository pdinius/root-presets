$(function () {
    const dict = {
        marquise_de_cat: {
            reach: 10,
            toggle: false,
            filename: 'marquise.jpg',
        },
        underground_duchy: {
            reach: 8,
            toggle: false,
            filename: 'duchy.jpg',
        },
        eyrie_dynasties: {
            reach: 7,
            toggle: false,
            filename: 'eyrie.jpg',
        },
        vagabond_A: {
            reach: 5,
            toggle: false,
            filename: 'vagabondA.jpg',
        },
        riverfolk_company: {
            reach: 5,
            toggle: false,
            filename: 'riverfolk.jpg',
        },
        woodland_alliance: {
            reach: 3,
            toggle: false,
            filename: 'woodland.jpg',
        },
        corvid_conspiracy: {
            reach: 3,
            toggle: false,
            filename: 'corvid.jpg',
        },
        vagabond_B: {
            reach: 2,
            toggle: false,
            filename: 'vagabondB.jpg',
        },
        lizard_cult: {
            reach: 2,
            toggle: false,
            filename: 'lizard.jpg',
        },
    }
    const fact_list = Object.keys(dict)
    const thresh = {
        2: 17,
        3: 18,
        4: 21,
        5: 25,
        6: 28,
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

    const get_on = () => {
        return Object.keys(dict).filter(v => dict[v].toggle)
    }

    const update_suggestions = () => {
        let facts = get_on()
        let suggestions = get_suggestions(5, facts)
        $('#bottom-container').html(() => {
            let res = ''
            for (let v of suggestions) {
                res += v.map(v => `<img src="${dict[v].filename}" />`).join('') + '<br/>'
            }
            return res
        })
    }

    $('.half-op').click(function () {
        let faction = $(this).attr('id')
        if (dict[faction].toggle) {
            $(this).css('opacity', .3)
        } else {
            $(this).css('opacity', 1)
        }
        dict[faction].toggle = !dict[faction].toggle
        update_suggestions()
    })
})