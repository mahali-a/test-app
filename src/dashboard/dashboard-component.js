/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import MenuIcon from '../assets/Menu.png';
import UserIcon from '../assets/User.png';
import ShoppingIcon from '../assets/Shopping.png';
import TransportIcon from '../assets/Transport.png';
import BillsIcon from '../assets/Bill.png';

const TopBar = () => {
  return (
    <View style={TopBarSyles.container}>
      <TouchableOpacity style={TopBarSyles.icon}>
        <Image style={TopBarSyles.image} source={MenuIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={TopBarSyles.image} source={UserIcon} />
      </TouchableOpacity>
    </View>
  );
};

const TopBarSyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getIcon = title => {
  if (title === 'Shopping') {
    return ShoppingIcon;
  } else if (title === 'Transport') {
    return TransportIcon;
  } else {
    return BillsIcon;
  }
};

const DashboardComponent = () => {
  const [expense, setExpense] = useState([]);
  const [currentBalance, setCurrentBalance] = useState('');
  const [loading, setLoading] = useState(true);

  const [income, setIncome] = useState('');
  const [spent, setSpent] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch(
      'https://my-json-server.typicode.com/obsidian-achernar/interview-db/db',
    );
    const result = await res.json();

    setExpense(result.expenses);
    setCurrentBalance(result.currentBalance.amount);
    setIncome(result.income.amount);
    setSpent(result.spent.amount);
    setLoading(false);
  };

  const ExpenseItem = ({title, time, amount}) => (
    <View style={styles.expenseItemContainer}>
      <View style={styles.expenseFirst}>
        <View style={styles.expenseInnerWrap}>
          <View style={styles.expenseIcon}>
            <Image source={getIcon(title)} />
          </View>
          <Text style={styles.expenseTitle}>{title}</Text>
          <View>
            <Text style={styles.expenseSubtitle}>{time}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.expenseAmount}>$ {amount}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color="#2429CF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>Current Balance</Text>
        <Text style={styles.balanceAmount}> $ {currentBalance}</Text>
      </View>

      <View style={styles.featuredContainer}>
        <View style={styles.featuredSection}>
          <Text style={styles.featuredTitle}>Income</Text>
          <Text style={styles.featuredSubtitle}>$ {income}</Text>
        </View>
        <View style={[styles.featuredSection, {borderRightWidth: 0}]}>
          <Text style={styles.featuredTitle}>Spent</Text>
          <Text style={styles.featuredSubtitle}>$ {spent}</Text>
        </View>
      </View>

      <View>
        <View>
          <View style={styles.expenseList}>
            <Text style={styles.expenseListTitle}>Expenses</Text>
            <TouchableOpacity style={styles.expenseListButton}>
              <Text style={styles.expenseListTitle}>View All</Text>
            </TouchableOpacity>
          </View>
          <View>
            {expense.map((item, index) => (
              <ExpenseItem
                key={index}
                title={item.type}
                amount={item.amount}
                time={''}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardComponent;

const styles = StyleSheet.create({
  expenseItemContainer: {
    marginBottom: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseIcon: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  expenseInnerWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  expenseTitle: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  expenseSubtitle: {
    fontSize: 13,
    color: '#000',
    opacity: 0.3,
  },
  expenseFirst: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  container: {padding: 20},
  balanceContainer: {marginTop: 30},
  balance: {color: '#000', fontSize: 22},
  balanceAmount: {color: '#000', fontSize: 22},

  featuredContainer: {
    marginTop: 40,
    backgroundColor: '#2429CF',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },
  featuredSection: {
    justifyContent: 'flex-start',
    width: '40%',
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  featuredTitle: {fontSize: 15, color: 'rgba(255,255,255,0.5)'},
  featuredSubtitle: {fontSize: 24, color: '#fff'},

  expenseList: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  expenseListTitle: {color: '#000'},
  expenseListButton: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
