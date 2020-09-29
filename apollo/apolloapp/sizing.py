import math
import json
from itertools import product
from .sizing_weights import mod_weight, batt_weight
from .DolarDolarbillyaaall import dolar_data
from .models import Baterias, Controladores, Modulos, Inversores
from .irrad import irradbyID
from .testing import discover_id

panels = Modulos.objects
batteries = Baterias.objects
charge_controllers = Controladores.objects
inverters = Inversores.objects.all()

def sizing_cal(id, consum):
    #Chamar o tariff também pelo ID
    irrad = irradbyID(id)

    dolar_var = dolar_data('1')[0]
    dol_stat = dolar_data('1')[1] #passa como BOOLEAN no return 

    #valores pré-definidos de potência dos módulos
    #predefined values of panels' power
    modpower_list = [50, 100, 150, 250,  350]

    #valores pré-definidos de amperagem das baterias
    #predefined values of batteries amperage
    battamp_list = [70, 100]

    #valores pré-definidos de amperagem dos controladores
    #predefined values of charge controllers' amperage
    ctramp_list = [30, 60]

    #area (m²) de modulos (50w, 100w, 150w, 250w, 350w)
    #panels' area (m²) for each specific power value (50w, 100w, 150w, 250w, 350w)
    modarea_list = [0.3825, 0.6679, 1.0064, 1.942336, 1.942336]

    #cálculo da Geração Mínima = (NGD/irrad)
    #calculation of minimum generation = (NGD/irrad)
    gmin = float(consum / irrad)  # em W/h

    #definição da quantidade de paineis
    #defining quantities of panels
    modqt_list = list(map(lambda x: math.ceil((gmin * 1.25) / x), modpower_list))

    #pegando a info de preço para cada painel
    #retrieving price info for each panel
    mod_uniprice_list = list(map(lambda x: panels.filter(pot=x).values('value').get(), modpower_list))

    #preço total dos paineis
    #panels' total price 
    mod_totalprice_list = []
    for qt, uniprice in zip(modqt_list, mod_uniprice_list):
        mod_totalprice_list.append((qt * uniprice['value'] * dolar_var))

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

    #lista com os valores de corrente máxima para os valores de potencia dos paineis (modpower_list)
    #list with the maximum current values for the power values of the panels
    imax_list = [] #50, 100, 150
    for q, p in zip(modqt_list, modpower_list):
        imax_list.append((q * p) / 12)
    
    del imax_list[3:5]

    #quantidade de baterias por configuração (varia com os valores de corrente máxima e de amperagem das baterias)
    #amount of batteries per configuration (varies with the maximum current and amperage values of the batteries)
    battqt_list = [] #c=50 a=70, c=100 a=70, c=150 a=70, c=50 a=100, c=100 a=100, c=150 a=100   
    for a, i in product(battamp_list, imax_list):
        battqt_list.append(math.ceil((i * irrad) / a))

    batt_uniprice_list = list(map(lambda x: batteries.filter(amp=x).values('value').get(), battamp_list))

    #dividindo a lista por valor de amperagem
    #spliting the list by amperage value
    middle_index = len(battqt_list)//2
    seventy_battqt = battqt_list[:middle_index]
    hunnid_battqt = battqt_list[middle_index:]

    #preço total das baterias
    #batteries total price 
    batt_totalprice_list = []

    for qtt in seventy_battqt:
        batt_totalprice_list.append((qtt * batt_uniprice_list[0].get('value') * dolar_var))

    for qtty in hunnid_battqt:
        batt_totalprice_list.append((qtty * batt_uniprice_list[1].get('value') * dolar_var))

    #quantidade de controladores por configuração 
    #amount of charge controllers per configuration
    ctrqt_list = [] #c=50 p=30, c=100 p=30, c=150 p=30, c=50 p=60, c=100 p=60, c=150 p=60
    for amp, c in product(ctramp_list, imax_list):
        ctrqt_list.append(math.ceil(c / amp))

    ctr_uniprice_list = list(map(lambda x: charge_controllers.filter(amp=x).values('value').get(), ctramp_list))

    #dividindo a lista por valor de amperagem
    #spliting the list by amperage value
    mid_index = len(ctrqt_list)//2
    thirty_ctrqt = ctrqt_list[:mid_index]
    sixty_ctrqt = ctrqt_list[mid_index:]

    #preço total das baterias
    #batteries total price
    ctr_totalprice_list = [] 

    for quantity in thirty_ctrqt:
        ctr_totalprice_list.append((quantity * ctr_uniprice_list[0].get('value') * dolar_var))

    for quant in sixty_ctrqt:
        ctr_totalprice_list.append((quant * ctr_uniprice_list[1].get('value') * dolar_var))

    #area
    area_list = []
    for quan, uni_area in zip(modqt_list, modarea_list):
        area_list.append(int(quan * uni_area))

    #pesos
    #weights
    mod_weightlist = mod_weight(modqt_list)
    other_weightlist = list(map(lambda x: x * 0.05, mod_weightlist))
    batt_weightlist = batt_weight(battqt_list)

    #payback valor inicial

    return ('no mistake round here')
    """ return json.dumps({
        "mod_quant": modqt_list,
        "mod_price": mod_totalprice_list,
        "mod_weight": mod_weightlist,
        "inv_power": invpower,
        "inv_price": invprice,
        "batt_quant": battqt_list,
        "batt_price": batt_totalprice_list,
        "batt_weight": batt_weightlist,
        "ctr_quant": ctrqt_list,
        "ctr_price": ctr_totalprice_list,
        "co2": eco,
        "area": area_list,
        "other_weight": other_weightlist
    }) """