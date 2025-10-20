// app/(tabs)/history.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native"; 
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";

import HistoryToolbar from "../../components/history/HistoryToolbar";
import HistoryList from "../../components/history/HistoryList";
import HistoryFilterModal from "../../components/history/HistoryFilterModal";

import { LogSection, FilterValue } from "../../types/history";
import { fetchHistory } from "../../api/historyApi";

export default function HistoryScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState<LogSection[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState(""); 
  const [debouncedQuery, setDebouncedQuery] = useState(""); 
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>(["all"]);

  const router = useRouter();
  const { prefillSearch } = useLocalSearchParams<{ prefillSearch: string }>();

  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedQuery(searchQuery); }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (prefillSearch) {
      setSearchQuery(prefillSearch);
      setActiveFilters(["all"]);
      router.setParams({ prefillSearch: undefined });
    }
  }, [prefillSearch, router]); 

  const loadHistory = useCallback(async () => {
    if (!isRefreshing) {
      setIsLoading(true);
    }
    try {
      const data = await fetchHistory({
        search: debouncedQuery,
        filters: activeFilters,
      });
      setHistoryData(data);
    } catch (error) {
      console.error("Gagal memuat riwayat:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [debouncedQuery, activeFilters, isRefreshing]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    async function refresh() {
      const data = await fetchHistory({ search: debouncedQuery, filters: activeFilters });
      setHistoryData(data);
      setIsRefreshing(false);
    }
    refresh();
  }, [debouncedQuery, activeFilters]);


  const handleFilterPress = () => setIsModalVisible(true);
  const handleSearchChange = (query: string) => setSearchQuery(query);
  const handleApplyFilter = (newFilters: FilterValue[]) => {
    setActiveFilters(newFilters);
    setIsModalVisible(false);
  };

  return (
    <>
      <View className="flex-1 bg-background">
        <HistoryToolbar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          activeFilter={activeFilters.length > 0 && activeFilters[0] !== 'all'}
          onFilterPress={handleFilterPress}
        />

        <HistoryList 
          sections={historyData} 
          isLoading={isLoading} 
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      </View>

      <HistoryFilterModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        currentFilters={activeFilters}
        onApplyFilter={handleApplyFilter}
      />
    </>
  );
}