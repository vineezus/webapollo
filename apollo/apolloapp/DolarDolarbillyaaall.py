import urllib.request

def dolar_data(periodo):

    headers = {}
    headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"

    try:
        dolar_url = 'https://economia.awesomeapi.com.br/list/USD-BRL/'+periodo+'?format=csv/'

        base_dolar_url = 'https://economia.awesomeapi.com.br/list/USD-BRL/?start_date=20191010&end_date=20191010&?format=csv'

        source_code_req = urllib.request.Request(dolar_url, headers=headers)
        base_source_req = urllib.request.Request(base_dolar_url, headers=headers)
        source_code = urllib.request.urlopen(source_code_req).read().decode()
        base_source = urllib.request.urlopen(base_source_req).read().decode()
        split_source = source_code.split('[')
        split_base = base_source.split('[')
        del split_source[0]
        del split_base[0]

        dbvalues = []
        dvalues = []

        for line in split_source:
            split_line = line.split(']')
            del split_line[1]

        for line in split_line:
            split_fds = line.split('{')
            del split_fds[0]

        for line in split_fds:
            split_pqp = line.split('}')
            del split_pqp[1]

        for line in split_pqp:
            split_tafoda = line.split(',')

        for line in split_tafoda:
            split_mds = line.split('"')
            del split_mds[0]
            del split_mds[1]
            del split_mds[2]
            dvalues.append(split_mds[1])

        for line in split_base:
            spbase_line = line.split(']')
            del spbase_line[1]

        for line in spbase_line:
            spbase_fds = line.split('{')
            del spbase_fds[0]

        for line in spbase_fds:
            spbase_pqp = line.split('}')
            del spbase_pqp[1]

        for line in spbase_pqp:
            spbase_tafoda = line.split(',')

        for line in spbase_tafoda:
            spbase_mds = line.split('"')
            del spbase_mds[0]
            del spbase_mds[1]
            del spbase_mds[2]
            dbvalues.append(spbase_mds[1])

        return (float(dvalues[7])/float(dbvalues[7])), 'good'

    except Exception as e:
        return 1, 'error'

#dolar_data(periodo='1')