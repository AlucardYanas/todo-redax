import type { AxiosInstance } from 'axios';
import apiInstance from './apiInstance';
import type { ApiResponse, CardDataType, CardType } from '../types/CardTypes';
import { localStorageService } from './localStorageService';

class CardService {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getCards(): Promise<CardType[]> {
    try {
      const { data } = await this.api.get<ApiResponse>('/cards');
      localStorageService.saveCards(data);
      return data;
    } catch (error) {
      console.log('Failed to fetch from API, using localStorage', error);
      return localStorageService.getCards();
    }
  }

  async addCard(obj: CardDataType): Promise<CardType> {
    try {
      const { data } = await this.api.post<CardType>('/cards', obj);
      localStorageService.addCard(data);
      return data;
    } catch (error) {
      console.log('Failed to add card to API, using localStorage', error);
      const newCard: CardType = {
        ...obj,
        id: localStorageService.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localStorageService.addCard(newCard);
      return newCard;
    }
  }

  async deleteCard(id: CardType['id']): Promise<void> {
    try {
      await this.api.delete(`/cards/${id}`);
      localStorageService.deleteCard(id);
    } catch (error) {
      console.log('Failed to delete card from API, using localStorage', error);
      localStorageService.deleteCard(id);
    }
  }

  async getCardStatus(id: CardType['id']): Promise<{ status: string }> {
    try {
      const { data } = await this.api.get<{ status: string }>(`/cards/${id}/status`);
      return data;
    } catch (error) {
      console.log('Failed to fetch card status from API, using localStorage', error);
      const status = localStorageService.getCardStatus(id);
      if (!status) {
        throw new Error('Card not found in localStorage');
      }
      return status;
    }
  }

  async updateCard(id: CardType['id'], cardData: CardType): Promise<CardType> {
    try {
      const { data } = await this.api.patch<CardType>(`/cards/${id}`, cardData);
      localStorageService.updateCard(id, data);
      return data;
    } catch (error) {
      console.log('Failed to update card in API, using localStorage', error);
      const updatedCard: CardType = {
        ...cardData,
        updatedAt: new Date().toISOString(),
      };
      localStorageService.updateCard(id, updatedCard);
      return updatedCard;
    }
  }
}

const cardService = new CardService(apiInstance);
export default cardService;
