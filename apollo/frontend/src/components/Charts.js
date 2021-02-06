import React, { useContext } from 'react';
import { Chart } from 'react-charts';
import "./style/Graph.css"

import { GlobalContext } from '../../context/GlobalState';

function Charts() {

  const { results } = useContext(GlobalContext);

  const defRes = [{"id":"price","mod_price":6695.887270072992,"inv_price":2788,"batt_price":2522.0806812652067,"ctr_price":3089.891079318735, "label": "Custo Estimado", "text":"R$ 15.095,86"},
    {"id":"mod","mod_quant":24, "label": "Módulos FV", "text":24},
    {"id":"batt","batt_quant":4, "label": "Baterias", "text":4},
    {"id":"inv","inv_power":1500, "label": "Inversor", "text":"1500 W"},
    {"id":"ctr","ctr_quant":4, "label": "Controladores de Carga", "text":4},
    {"id":"weight","mod_weight":245.00000000000003,"other_weight":12.250000000000002,"batt_weight":59, "label": "Peso", "text":"317 kg"},
    {"id":"area","area":9.18, "label": "Área", "text":"9.18 m²"},
    {"id":"payback","payback_yrs":3,"payback_arrays":[
      [
          0,
          -8334.5
      ],
      [
          1,
          -8191
      ],
      [
          2,
          -7896
      ],
      [
          3,
          -7437
      ],
      [
          4,
          -6804
      ],
      [
          5,
          -5983
      ],
      [
          6,
          -4963
      ],
      [
          7,
          -3729
      ],
      [
          8,
          -2267
      ],
      [
          9,
          -559
      ],
      [
          10,
          1410
      ],
      [
          11,
          3658
      ],
      [
          12,
          6207
      ]], "label": "Payback", "text":"3 anos"},
    {"id":"co2","co2":8, "label": "Evitação de CO²", "text":"8 kg/mês"}]

  const pbArray = defRes.filter(res => res.id === "payback").map(res => res.payback_arrays)

  const data = React.useMemo(() => pbArray,[])

  const series = React.useMemo(
      () => ({
          type: 'bar'
      }),
      []
  )
    
    const axes = React.useMemo(
      () => [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left', format: (d) => `R$${d}`}
      ],
      []
    )

    const getSeriesStyle = React.useCallback(
      () => ({
        color: `url(#0)`,
      }),
      []
    );

    const tooltip = React.useMemo(
      () => ({
        render: ({ datum, secondaryAxis }) => {
          return <CustomTooltip {...{ datum, secondaryAxis}} />;
        }
      }),
      []
    );
    
    return (
        <div className="chart">
            <Chart
              data={data}
              series={series}
              axes={axes}
              showGrid={false}
              getSeriesStyle={getSeriesStyle}
              renderSVG={() => (
                <defs>
                  <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                    <stop offset="0%" stopColor="#ff512f" />
                    <stop offset="100%" stopColor="#ffbe00" />
                  </linearGradient>
                </defs>
              )}
              tooltip={tooltip}
            />
        </div>
    )
}

function CustomTooltip({ datum, secondaryAxis }) {
  const data = React.useMemo(
    () =>
      datum
        ? [
            {
              data: datum.group.map(d => ({
                primary: d.series.label,
                secondary: d.secondary,
              }))
            }
          ]
        : [],
    [datum]
  );
  return datum ? (
    <div
      style={{
        color: "white",
        pointerEvents: "none",
        height: "fit-content",
        width: "fit-content",
      }}
    >
      <h3
        style={{
          display: "block",
          textAlign: "center",
          padding: 0,
          margin: 0,
        }}
      >
        {`Ano ${datum.primary}`}
      </h3>
      <h3
        style={{
          textAlign: "center",
          textDecoration: "none",
          border: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {secondaryAxis.format(datum.secondary)}
      </h3>
    </div>
  ) : null;
}

export default Charts