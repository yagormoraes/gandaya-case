import { useState, useEffect } from 'react';
import axios from 'axios';

export interface MenuItem {
  id: number;
  item: string;
  price: number;
  availableQuantity: number;
  image: string;
}

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get<MenuItem[]>('http://localhost:3001/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens do menu:', error);
      setError('Erro ao buscar itens do menu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return { menuItems, loading, error };
};
