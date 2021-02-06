const defRes = [{"id":"price","mod_price":6695.887270072992,"inv_price":2788,"batt_price":2522.0806812652067,"ctr_price":3089.891079318735, "label": "Custo Estimado", "text":"R$ 15.095,86"},
{"id":"mod","mod_quant":24, "label": "Módulos FV", "text":24},
{"id":"batt","batt_quant":4, "label": "Baterias", "text":4},
{"id":"inv","inv_power":1500, "label": "Inversor", "text":"1500 W"},
{"id":"ctr","ctr_quant":4, "label": "Controladores de Carga", "text":4},
{"id":"weight","mod_weight":245.00000000000003,"other_weight":12.250000000000002,"batt_weight":59, "label": "Peso", "text":"317 kg"},
{"id":"area","area":9.18, "label": "Área", "text":"9.18 m²"},
{"id":"payback","payback_yrs":3,"payback_arrays":[[0,-15095.859030656933],[1,32214.371265253627],[2,146139.41973533362],[3,353860.9678762518]], "label": "Payback", "text":"3 anos"},
{"id":"co2","co2":8, "label": "Evitação de CO²", "text":"8 kg/mês"}]

const prArray = defRes.filter(res => res.id === "price")

const arrayLength = Object.keys(prArray).length

const getSpecific = (key) => prArray.map(res => res[key])[0]

const [mod_price, inv_price, batt_price, ctr_price] = arrayLength<7
    ? [getSpecific("mod_price"), getSpecific("inv_price"), getSpecific("batt_price"), getSpecific("ctr_price")]
    : [getSpecific("mod_price"), getSpecific("inv_price"), null, null]

console.log(prArray)