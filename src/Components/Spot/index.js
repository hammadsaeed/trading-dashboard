import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardComp from './card';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: '#353535',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: '90vh',
    width: '90vw',
    padding: '2vh 2.5vw',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    display: 'flex',
  },
  text: {
    padding: '0.25em',
    margin: 0,
    color: 'white',
  },
  priceContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto auto auto',
    gridGap: 10,
    maxHeight: '34vh',
    overflowY: 'auto',
  },
  ordersTable: {
    margin: '10px 0px',
    overflow: 'auto',
    height: '35%',
  }
});


const Spot = (props) => {
  const classes = useStyles();
  const [binanceBalance, setbinanceBalance] = useState([]);
  const [money, setMoney] = useState(100);
  const [totalAssets, setTotalAssets] = useState(0);
  const {socket} = props;

  const handlePrice = (toAdd) => {
    setMoney(money + toAdd)
  }

  useEffect(() => {
    const updateBalance = (payload) => {
      if(payload) {
        let value = 0;
        const result = Object.keys(payload).map((key) => {
          value += parseFloat(payload[key].assetValue);
          return payload[key];
        });
        setTotalAssets(value.toFixed(2))
        setbinanceBalance(result);
      }
    };
    socket.on('UPDATEHOLDING', updateBalance);

    return () => {
      socket.off('disconnet');
    };
  }, [socket]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2>Spot Trading</h2>
        <h2>{totalAssets}$</h2>
      </div>
      <div className={classes.header}>
        <div>
          <h4 className={classes.subHeading}>Positions Opened</h4>
          <div className={classes.priceContainer}>
            {binanceBalance.map((coin) => (
              <CardComp key={coin.symbol} {...coin} handlePrice={handlePrice}/>
            ))}
          </div>
        </div>
        <div className={classes.bodyContainer}>
          <h4>Trading Signals</h4>
        </div>
      </div>
    </div>
  )
}

export default Spot;