import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from '@/store';

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useStore();

  const getBestStore = () => {
    const storeTotals = {};
    
    cart.forEach(item => {
      item.prices.forEach(price => {
        if (!storeTotals[price.store]) {
          storeTotals[price.store] = 0;
        }
        storeTotals[price.store] += price.price;
      });
    });

    const bestStore = Object.entries(storeTotals).reduce((a, b) => 
      a[1] < b[1] ? a : b
    );

    return {
      store: bestStore[0],
      total: bestStore[1].toFixed(2),
    };
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          Best Price: ${Math.min(...item.prices.map(p => p.price)).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  const bestStoreInfo = getBestStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>
      
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.summary}>
        <View style={styles.bestDeal}>
          <Text style={styles.bestDealTitle}>Best Deal Summary:</Text>
          <Text style={styles.bestDealText}>
            Shop at {bestStoreInfo.store} for ${bestStoreInfo.total}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={clearCart}
        >
          <Text style={styles.checkoutButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6C757D',
  },
  cartList: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#007AFF',
  },
  removeButton: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  summary: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  bestDeal: {
    marginBottom: 15,
  },
  bestDealTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  bestDealText: {
    fontSize: 16,
    color: '#28A745',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});