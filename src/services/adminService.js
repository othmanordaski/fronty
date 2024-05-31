import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export function fetchClients() {
    return api.get('/admin/manage-users');
}

export function fetchUsers(role) {
    switch (role) {
      case 'user':
        return api.get('/admin/manage-users');
      case 'restaurant':
        return api.get('/admin/manage-restaurants');
      case 'delivery':
        return api.get('/admin/manage-deliveries');
      default:
        return api.get('/admin/manage-users');
    }
  }

  export function deleteUser(id, role) {
    
    switch (role) {
      case 'Client':
        return api.delete(`/admin/delete/user/${id}`);
      case 'Restaurant':
        return api.delete(`/admin/delete/restaurant/${id}`);
      case 'Delivery':
        return api.delete(`/admin/delete/delivery/${id}`);
      default:
        return api.delete(`/admin/delete/user/${id}`);
    }
}
export function fetchOrder() {
    return api.get('/admin/manage-orders');
}
export function deleteOrder(id) {
    return api.delete(`/admin/delete/order/${id}`);
}

export function fetchMenu() {
    return api.get('/restaurant/menu');
}