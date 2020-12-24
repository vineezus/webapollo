import math
import locale
import json
from itertools import product
from .sizing_weights import mod_weight, batt_weight
from .DolarDolarbillyaaall import dolar_data
from .models import Baterias, Controladores, Modulos, Inversores
from .irrad import irradbyID
#from .tariff import tariff_sheriff

panels = Modulos.objects
batteries = Baterias.objects
charge_controllers = Controladores.objects
inverters = Inversores.objects.all()

locale.setlocale(locale.LC_ALL, '')

def sizingoff_cal(config, id, consum):
    mod_power = config['mod']

    batt_amp = config['batt']

    ctr_amp = config['ctr']
    
    ##### Chamar o tariff também pelo ID ##########
    irrad = irradbyID(id)

    dolar_var = dolar_data('1')[0]
    dol_stat = dolar_data('1')[1] #passa como BOOLEAN no return 

    #cálculo da Geração Mínima = (NGD/irrad), para OFF pede o NGD direto então considerar consum = NGD
    #calculation of minimum generation = (NGD/irrad)
    gmin = float(consum / irrad)  # em W/h

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

    invpower = inverters.filter(pot__gte=pot_seg)[1]#r
    invpower = invpower.pot

    #preço do inversor
    #inverter's price
    invprice = inverters.filter(pot__gte=pot_seg)[1] #r
    invprice = invprice.value

    #evitação de CO2 mensal (em kg de CO2)
    #monthly CO2 emission avoidance (CO2 kg)
    eco = int((consum / 1000) * 1.63)  #r

    #valores de corrente máxima para o valor de potencia dos painel
    #maximum current values for the power value of the panel
    imax = (modqt * mod_power) / 12

    #quantidade de baterias por configuração (varia com os valores de corrente máxima e de amperagem das baterias)
    #amount of batteries per configuration (varies with the maximum current and amperage values of the batteries)
    battqt = math.ceil((batt_amp * irrad) / imax)

    #pegando a info de preço para cada painel
    #retrieving price info for each panel
    batt_uniprice = batteries.filter(amp=batt_amp).values('value').get()

    #preço total das baterias
    #batteries total price 
    batt_totalprice = battqt * batt_uniprice.get('value') * dolar_var

    #quantidade de controladores por configuração 
    #amount of charge controllers per configuration
    ctrqt = math.ceil(imax / ctr_amp)

    #pegando a info de preço para cada painel
    #retrieving price info for each panel
    ctr_uniprice = charge_controllers.filter(amp=ctr_amp).values('value').get()

    #preço total das baterias
    #batteries total price
    ctr_totalprice = ctrqt * ctr_uniprice.get('value') * dolar_var

    
    #area (m²) de modulos (50w, 100w, 150w)
    #panels' area (m²) for each specific power value (50w, 100w, 150w)
    modarea_list = [0.3825, 0.6679, 1.0064]

    #area
    area_index = int((mod_power/50)-1)
    area_uni = modarea_list[area_index]
    
    area_total = modqt * area_uni

    #pesos
    #weights
    modweight = mod_weight(modqt, mod_power, 'off')
    other_weight = modweight * 0.05
    battweight = batt_weight(battqt, batt_amp)

    #payback valor inicial (EM BREVE!!)

    return [
        {
            "id": "price",
            "mod_price": mod_totalprice,
            "inv_price": invprice,
            "batt_price": batt_totalprice,
            "ctr_price": ctr_totalprice,
            "text": locale.currency((mod_totalprice + invprice + batt_totalprice + ctr_totalprice), grouping=True, symbol='R$')
        },
        {
            "id": "mod",
            "mod_quant": modqt,
            "text": modqt
        },
        {
            "id": "batt",
            "batt_quant": battqt,
            "text": battqt
        },
        {
            "id": "inv",
            "inv_power": invpower,
            "text": invpower
        },
        {
            "id": "ctr",
            "ctr_quant": ctrqt,
            "text": ctrqt
        },
        {
            "id": "weight",
            "mod_weight": modweight,
            "other_weight": other_weight,
            "batt_weight": battweight,
            "text": "%s kg" % (modweight + other_weight + battweight)
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