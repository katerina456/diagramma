import React, { useEffect } from "react";

function Diagramma() {
  const [array, setArray] = React.useState([]);

  useEffect(() => {
    let dataName = 'Time Series (Daily)';
    let optionName = "5. volume";

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo')
    .then(res => res.json())
    .then(data => {
        setArray([]);
        let userData = data[dataName];
        let counter = 0;

        for (let elem in userData) {
            if (counter < 30 ) {
                setArray(prev => {
                    return [...prev, +userData[elem][optionName]];
                })
            }
            counter ++;
        }
    })
  }, [])

  const maximum = React.useMemo(() => {
    return Math.max.apply(null, array);
  }, [array])


  return (
    <div className="diagramma">
        <h1 className="h1">Динамика дохода</h1>
        <div className="diagramma-box">
            <div className="build-area">
                <div className="grid-y">

                    { Array.from(new Array(6)).map((item, index) => 
                        <p key={index} className="text">
                            { Math.round(maximum * (5 - index) / 5) }
                        </p>) }
                </div>

                <div className="columns">

                    { array.map((item, index) => 
                        <div key={index+7} className="column" data-after={item}
                            style={{height: `${ Math.round(item  *100 / maximum) }%`}}>
                        </div>) }
                </div>

            </div>

            <div className="grid-x">
                <p className="text">1</p>

                { Array.from(new Array(6)).map((item, index) => 
                    <p key={index+55} className="text">{(index + 1) * 5}</p>) }
            </div>

        </div>
    </div>
  );
}

export default Diagramma;