import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
  root: {
    textAlignLast: 'justify',
    minWidth: 150,
    borderRadius: 10,
    paddingBottom: 0,
  },
  title: {
    fontSize: 10,
  },
  pos: {
    marginBottom: 0,
    fontSize: '1.5vh',
  },
});

const CardComp = (props, handlePrice) => {
  const { symbol, price, balance} = props;
  const classes = useStyles();

  const value = price * balance
  if(value < 1 && value > 0) {
    return <></>
  }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h6">
          {symbol}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Balance: {parseFloat(balance).toFixed(3)}
        </Typography>
        {(symbol !== 'USDT') && (
          <Typography className={classes.pos}>
            {symbol}/USDT: {parseFloat(price).toFixed(3)}
          </Typography>
        )}
        <Typography className={classes.pos}>
          Value: {symbol === 'USDT' ? parseFloat(balance).toFixed(3) : value.toFixed(3)}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default CardComp;