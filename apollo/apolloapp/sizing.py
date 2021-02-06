import math
import json
import locale
from itertools import product
from .sizing_weights import mod_weight, batt_weight
from .DolarDolarbillyaaall import dolar_data
from .models import Modulos, Inversores
from .irrad import irradbyID
from .payback import thebigpayback

panels = Modulos.objects
inverters = Inversores.objects.all()

def sizing_cal(config, id, consum):
    mod_power = config['mod']

    irrad = irradbyID(id)

    dol = dolar_data('1')
    dolar_var = dol[0]

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
    mod_totalprice = math.ceil((modqt * mod_uniprice['value'] * dolar_var))

    #dimensionamento potência do inversor
    #inverter power sizing
    pot_seg = gmin * 1.3

    invpower = inverters.filter(pot__gte=pot_seg)[0]#r
    invpower = invpower.pot

    #preço do inversor
    #inverter's price
    invprice = inverters.filter(pot__gte=pot_seg)[0] #r
    invprice = math.ceil(invprice.value)

    #evitação de CO2 mensal (em kg de CO2)
    #monthly CO2 emission avoidance (CO2 kg)
    eco = math.ceil(consum * 1630)  #r
    
    #area
    area_total = math.ceil(modqt * 1.942336)

    #pesos
    #weights
    modweight = mod_weight(modqt, mod_power, 'on')
    other_weight = math.ceil(modweight * 0.05)

    #payback
    total_cost = math.ceil(mod_totalprice + invprice)
    pb = thebigpayback(id, (modqt*mod_power), total_cost, True)
    
    #warnings
    dol_stat = dol[1]
    pb_stat = pb[2]
    both_equal = True if (dol_stat == pb_stat) else False

    if (both_equal == False):
        wrng = ("Os valores de " + ("Custo", "Payback")[dol_stat] + " podem estar defasados neste dimensionamento")
    else:
        wrng = ("Os valores de Custo e Payback podem estar defasados neste dimensionamento",
                False)[dol_stat]

    return [
        {
            "id": "price",
            "mod_price": mod_totalprice,
            "inv_price": invprice,
            "label": "Custo Estimado",
            "text": locale.currency(total_cost, grouping=True, symbol='R$')
        },
        {
            "id": "mod",
            "mod_quant": modqt,
            "label": "Módulos",
            "text": modqt
        },
        {
            "id": "inv",
            "inv_power": invpower,
            "label": "Inversor",
            "text": "%s W" % (int(invpower))
        },
        {
            "id": "weight",
            "mod_weight": modweight,
            "other_weight": other_weight,
            "label": "Peso",
            "text": "%s kg" % (modweight + other_weight)
        },
        {
            "id": "area",
            "area": area_total,
            "label": "Área",
            "text": "%s m²" % (area_total)
        },
        {
            "id": "payback",
            "payback_yrs": pb[0],
            "payback_arrays": pb[1],
            "label": "Payback",
            "text": "%s anos" % (pb[0])
        },
        {
            "id": "co2",
            "co2": eco,
            "label": "Evitação de CO²",
            "text": "%s kg/mês" % (eco)
        },
        {
            "id": "warnings",
            "text": wrng
        }
    ]