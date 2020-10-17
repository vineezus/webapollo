import math
import json
import locale
from itertools import product
from .sizing_weights import mod_weight, batt_weight
from .DolarDolarbillyaaall import dolar_data
from .models import Modulos, Inversores
from .irrad import irradbyID
from .testing import discover_id

panels = Modulos.objects
inverters = Inversores.objects.all()

def sizing_cal(config, id, consum):
    mod_power = config['mod']
    #Chamar o tariff também pelo ID
    irrad = irradbyID(id)

    dolar_var = dolar_data('1')[0]
    dol_stat = dolar_data('1')[1] #passa como BOOLEAN no return 

    #cálculo da Geração Mínima = (NGD (em Wh)/irrad)
    #calculation of minimum generation = (NGD/irrad)
    gmin = float(((consum*100)/3)/ irrad)  

    #definição da quantidade de paineis
    #defining quantities of panels
    modqt = math.ceil((gmin * 1.25) / mod_power)

    #pegando a info de preço para cada painel
    #retrieving price info for each panel
    mod_uniprice = panels.filter(pot=mod_power).values('value').get()

    #preço total dos paineis
    #panels' total price 
    mod_totalprice = (modqt * mod_uniprice['value'] * dolar_var)

    #dimensionamento potência do inversor
    #inverter power sizing
    pot_seg = gmin * 1.3

    invpower = inverters.filter(pot__gte=pot_seg)[0]#r
    invpower = invpower.pot

    #preço do inversor
    #inverter's price
    invprice = inverters.filter(pot__gte=pot_seg)[0] #r
    invprice = invprice.value

    #evitação de CO2 mensal (em kg de CO2)
    #monthly CO2 emission avoidance (CO2 kg)
    eco = math.ceil(consum * 1630)  #r
    
    #area
    area_total = math.ceil(modqt * 1.942336)

    #pesos
    #weights
    modweight = mod_weight(modqt, mod_power, 'on')
    other_weight = modweight * 0.05

    #payback valor inicial (EM BREVE!!)

    return [
        {
            "id": "price",
            "mod_price": mod_totalprice,
            "inv_price": invprice,
            "text": locale.currency((mod_totalprice + invprice), grouping=True, symbol='R$')
        },
        {
            "id": "mod",
            "mod_quant": modqt,
            "text": modqt
        },
        {
            "id": "inv",
            "inv_power": invpower,
            "text": invpower
        },
        {
            "id": "weight",
            "mod_weight": modweight,
            "other_weight": other_weight,
            "text": "%s kg" % (modweight + other_weight)
        },
        {
            "id": "area",
            "area": area_total,
            "text": "%s m²" % (area_total)
        },
        {
            "id": "payback",
            "payback_yrs": 'finja que tem o payback aqui',
            "payback_arrays": 'finja novamente',
            "text": "paybackyrs"
        },
        {
            "id": "co2",
            "co2": eco,
            "text": eco
        }
    ]