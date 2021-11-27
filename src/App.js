import "./App.css";
import React, { useState, useEffect } from "react";

const init = [
  {
    permintaan: 10,
    probabilitas: 0.1,
  },
  {
    permintaan: 50,
    probabilitas: 0.2,
  },
  {
    permintaan: 100,
    probabilitas: 0.3,
  },
  {
    permintaan: 150,
    probabilitas: 0.4,
  },
];

function App() {
  const [data, setData] = useState(init);
  const [payoff, setPayoff] = useState([[]]);
  const [exReturn, setExReturn] = useState([[]]);
  const [beli, setBeli] = useState("");
  const [jual, setJual] = useState("");
  const [permintaan, setPermintaan] = useState("");
  const [probabilitas, setProbabilitas] = useState("");

  const addData = () => {
    if (permintaan !== "" && probabilitas !== "") {
      setData([...data, { permintaan: parseInt(permintaan), probabilitas: parseFloat(probabilitas) }]);
    }
    setPermintaan("");
    setProbabilitas("");
  };

  const transpose = (a) => {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) {
        return r[c];
      });
    });
  };

  const calculatePayoff = () => {
    var temp = new Array(data.length);
    for (var i = 0; i < temp.length; i++) {
      temp[i] = new Array(data.length);
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].permintaan < data[i].permintaan) {
          temp[i][j] = data[j].permintaan * jual - data[i].permintaan * beli;
        } else {
          temp[i][j] = data[i].permintaan * jual - data[i].permintaan * beli;
        }
      }
    }
    setPayoff(transpose(temp));
    return temp;
  };

  const calculateReturn = async () => {
    const payoffRef = await calculatePayoff();
    var temp = new Array(data.length);
    for (var i = 0; i < temp.length; i++) {
      temp[i] = new Array(data.length);
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        temp[i][j] = data[j].probabilitas * payoffRef[i][j];
      }
    }
    for (let i = 0; i < temp.length; i++) {
      var sum = 0;
      for (let j = 0; j < temp.length; j++) {
        sum += temp[i][j];
      }
      temp[i][temp.length] = sum;
    }
    setExReturn(transpose(temp));
  };

  // console.log(payoff);
  console.log(exReturn);

  useEffect(() => {
    calculateReturn();
  }, [data, beli, jual]);

  return (
    <div className="App">
      <div className="flex">
        <p>harga beli</p>
        <input className="border border-black" type="number" value={beli} onChange={(e) => setBeli(e.target.value)} />
      </div>
      <div className="flex">
        <p>harga jual</p>
        <input className="border border-black" type="number" value={jual} onChange={(e) => setJual(e.target.value)} />
      </div>
      <div className="mt-6 text-left">
        <p>data permintaan dan probabilitas</p>
        <table className="border-collapse border border-green-800">
          <tr>
            <th className="border border-green-600">No.</th>
            <th className="border border-green-600">Permintaan (Unit/Hari)</th>
            <th className="border border-green-600">Probabilitas</th>
          </tr>
          {(data?.length &&
            data.map((list, i) => (
              <tr key={i}>
                <td className="border border-green-600">{i + 1}</td>
                <td className="border border-green-600">{list.permintaan}</td>
                <td className="border border-green-600">{list.probabilitas}</td>
              </tr>
            ))) || (
            <tr>
              <td className="border border-green-600">-</td>
              <td className="border border-green-600">-</td>
              <td className="border border-green-600">-</td>
            </tr>
          )}
        </table>
        <div className="flex mt-4">
          <p>{(data?.length && data.length + 1) || 1}</p>
          <input className="border border-black" type="number" value={permintaan} onChange={(e) => setPermintaan(e.target.value)} />
          <input className="border border-black" type="number" value={probabilitas} onChange={(e) => setProbabilitas(e.target.value)} />
          <button className="bg-red-500 p-1" onClick={addData}>
            +
          </button>
        </div>
        <table className="border-collapse border border-green-800">
          <tr>
            <td colSpan="1" rowSpan="2" className="border border-green-600">
              probabilitas koran
            </td>
            <td colSpan={data.length} className="border border-green-600">
              jumlah dan probabilitas permintaan koran
            </td>
          </tr>
          <tr>
            {data?.length &&
              data.map((list, i) => (
                <td key={i} className="border border-green-600">
                  {list.permintaan} = {list.probabilitas}
                </td>
              ))}
          </tr>
          {data?.length &&
            data.map((list, i) => (
              <tr>
                <td key={i} className="border border-green-600">
                  {list.permintaan}
                </td>
                {payoff?.length &&
                  payoff.map((list, j) => (
                    <td key={j} className="border border-green-600">
                      {list[i]}
                    </td>
                  ))}
              </tr>
            ))}
        </table>
        <table className="border-collapse border border-green-800">
          <tr>
            <td colSpan="1" rowSpan="2" className="border border-green-600">
              expected result
            </td>
            <td colSpan={data.length} rowSpan="1" className="border border-green-600">
              probabilitas
            </td>
            <td colSpan="1" rowSpan="2" className="border border-green-600">
              ER
            </td>
          </tr>
          <tr>
            {data?.length &&
              data.map((list, i) => (
                <td key={i} className="border border-green-600">
                  {list.probabilitas}
                </td>
              ))}
          </tr>
          {data?.length &&
            data.map((list, i) => (
              <tr>
                <td key={i} className="border border-green-600">
                  ER = {list.permintaan}
                </td>
                {exReturn?.length &&
                  exReturn.map((list, j) => (
                    <td key={j} className="border border-green-600">
                      {list[i]}
                    </td>
                  ))}
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default App;
