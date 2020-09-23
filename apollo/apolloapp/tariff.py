import urllib.request
import json

def tariff_sheriff(sig):
    try:
        entry = {}
        headers = {}
        headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"

        dolar_url = "http://www.aneel.gov.br/dados/relatorios?p_p_id=dadosabertos_WAR_dadosabertosportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=gerarTarifaFornecimentoResidencialJSON&p_p_cacheability=cacheLevelPage&p_p_col_id=column-2&p_p_col_count=1"

        source_code_req = urllib.request.Request(dolar_url, headers=headers)
        source_code = urllib.request.urlopen(source_code_req).read().decode('latin1')
        jsource = json.loads(source_code)
        
        tarifas=[]
        tarifa_sum=0
        for entry in jsource:
            if entry['sigUF'] == sig:
                tarifas.append(float(entry['vlrTotaTRFConvencional']))

        if len(tarifas) > 1:
            for tarifa in tarifas:
                tarifa_sum += tarifa
            avg_tarifa=(tarifa_sum/len(tarifas))
        else:
            avg_tarifa=tarifas[0]

        return avg_tarifa, 'good'

    except Exception as e:
        return 0.56, 'error'