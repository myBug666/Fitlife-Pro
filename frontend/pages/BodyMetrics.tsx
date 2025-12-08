import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChevronLeft, TrendingDown, TrendingUp, User, FileText, Share2, Calendar, Info } from 'lucide-react';
import { ApiService } from '../services/ApiService';
import { BodyMetric } from '../types';
import { COLORS } from '../constants';

const BodyMetrics: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [bodyData, setBodyData] = useState<BodyMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'bodyFatRate' | 'muscleMass'>('weight');
  const [selectedRecord, setSelectedRecord] = useState<BodyMetric | null>(null);

  useEffect(() => {
    loadBodyMetrics();
  }, []);

  const loadBodyMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      // 获取最近6个月的数据
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);

      const data = await ApiService.getBodyMetrics(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      
      setBodyData(data);
      if (data.length > 0) {
        setSelectedRecord(data[data.length - 1]); // 选中最新的记录
      }
    } catch (err) {
      setError(ApiService.handleError(err));
      console.error('Failed to load body metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (bodyData.length === 0) {
      return {
        labels: ['暂无数据'],
        datasets: [{ data: [0] }]
      };
    }

    const labels = bodyData.map(item => item.testDate.substring(5)); // MM-DD格式
    let data = [];
    let title = '';
    let color = COLORS.primary;

    switch (selectedMetric) {
      case 'weight':
        data = bodyData.map(item => item.weight);
        title = '体重趋势';
        color = '#32CD32';
        break;
      case 'bodyFatRate':
        data = bodyData.map(item => item.bodyFatRate);
        title = '体脂率趋势';
        color = '#FF6347';
        break;
      case 'muscleMass':
        data = bodyData.map(item => item.muscleMass);
        title = '肌肉量趋势';
        color = '#4169E1';
        break;
    }

    return {
      labels,
      datasets: [{
        data,
        color: () => color,
        strokeWidth: 2
      }],
      title
    };
  };

  const getTrendIcon = (metric: 'weight' | 'bodyFatRate' | 'muscleMass') => {
    if (bodyData.length < 2) return null;

    const first = bodyData[0][metric];
    const last = bodyData[bodyData.length - 1][metric];
    const difference = last - first;

    // 体重和体脂率下降是好的，肌肉量增加是好的
    const isPositiveTrend = metric === 'muscleMass' ? difference > 0 : difference < 0;
    const iconColor = isPositiveTrend ? '#32CD32' : '#FF6347';

    return isPositiveTrend ? (
      <TrendingUp size={16} color={iconColor} />
    ) : (
      <TrendingDown size={16} color={iconColor} />
    );
  };

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case 'weight':
      case 'muscleMass':
        return 'kg';
      case 'bodyFatRate':
        return '%';
      case 'bmi':
        return '';
      case 'waistline':
      case 'hip':
        return 'cm';
      default:
        return '';
    }
  };

  const renderLatestMetric = (label: string, value: number, metric: string, icon: React.ReactNode) => {
    return (
      <View style={styles.metricCard}>
        <View style={styles.metricHeader}>
          <Text style={styles.metricLabel}>{label}</Text>
          <View style={styles.trendContainer}>
            {icon}
          </View>
        </View>
        <Text style={styles.metricValue}>
          {value.toFixed(1)} <Text style={styles.metricUnit}>{getMetricUnit(metric)}</Text>
        </Text>
      </View>
    );
  };

  const handleGenerateReport = () => {
    // 这里可以实现生成PDF报告的逻辑
    alert('生成报告功能待实现');
  };

  const handleShareReport = () => {
    // 这里可以实现分享报告的逻辑
    alert('分享报告功能待实现');
  };

  const chartData = getChartData();
  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>体测数据</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>体测数据</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadBodyMetrics} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>重试</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 头部导航 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>体测数据</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleGenerateReport} style={styles.actionButton}>
            <FileText size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShareReport} style={styles.actionButton}>
            <Share2 size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 最新体测数据概览 */}
        {selectedRecord && (
          <View style={styles.overviewSection}>
            <Text style={styles.sectionTitle}>最新体测数据</Text>
            <Text style={styles.testDate}>
              <Calendar size={14} style={styles.dateIcon} /> 测试日期: {selectedRecord.testDate}
            </Text>
            
            <View style={styles.metricsGrid}>
              {renderLatestMetric('体重', selectedRecord.weight, 'weight', getTrendIcon('weight'))}
              {renderLatestMetric('体脂率', selectedRecord.bodyFatRate, 'bodyFatRate', getTrendIcon('bodyFatRate'))}
              {renderLatestMetric('肌肉量', selectedRecord.muscleMass, 'muscleMass', getTrendIcon('muscleMass'))}
            </View>

            {/* 详细指标 */}
            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>BMI指数</Text>
                <Text style={styles.detailValue}>{selectedRecord.bmi.toFixed(1)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>腰围</Text>
                <Text style={styles.detailValue}>{selectedRecord.waistline.toFixed(1)} cm</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>臀围</Text>
                <Text style={styles.detailValue}>{selectedRecord.hip.toFixed(1)} cm</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>腰臀比</Text>
                <Text style={styles.detailValue}>
                  {(selectedRecord.waistline / selectedRecord.hip).toFixed(2)}
                </Text>
              </View>
            </View>

            {/* 教练建议 */}
            <View style={styles.suggestionCard}>
              <View style={styles.suggestionHeader}>
                <Info size={16} color={COLORS.primary} />
                <Text style={styles.suggestionTitle}>教练建议</Text>
              </View>
              <Text style={styles.suggestionText}>{selectedRecord.coachSuggestion}</Text>
            </View>
          </View>
        )}

        {/* 趋势图表 */}
        {bodyData.length > 0 && (
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>数据趋势图</Text>
            
            {/* 指标选择器 */}
            <View style={styles.metricSelector}>
              <TouchableOpacity
                style={[styles.selectorButton, selectedMetric === 'weight' && styles.activeSelector]}
                onPress={() => setSelectedMetric('weight')}
              >
                <Text style={[styles.selectorText, selectedMetric === 'weight' && styles.activeSelectorText]}>
                  体重
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.selectorButton, selectedMetric === 'bodyFatRate' && styles.activeSelector]}
                onPress={() => setSelectedMetric('bodyFatRate')}
              >
                <Text style={[styles.selectorText, selectedMetric === 'bodyFatRate' && styles.activeSelectorText]}>
                  体脂率
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.selectorButton, selectedMetric === 'muscleMass' && styles.activeSelector]}
                onPress={() => setSelectedMetric('muscleMass')}
              >
                <Text style={[styles.selectorText, selectedMetric === 'muscleMass' && styles.activeSelectorText]}>
                  肌肉量
                </Text>
              </TouchableOpacity>
            </View>

            {/* 图表 */}
            <View style={styles.chartContainer}>
              <LineChart
                data={chartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: COLORS.primary
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: '',
                    stroke: '#f0f0f0'
                  }
                }}
                bezier
                style={styles.chart}
                withInnerLines={true}
                withOuterLines={true}
                withHorizontalLabels={true}
                withVerticalLabels={true}
                withDots={true}
                withShadow={false}
                segments={5}
              />
            </View>
          </View>
        )}

        {/* 历史记录列表 */}
        {bodyData.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>历史记录</Text>
            {bodyData.slice().reverse().map((record) => (
              <TouchableOpacity
                key={record.testId}
                style={[
                  styles.historyItem,
                  selectedRecord?.testId === record.testId && styles.selectedHistoryItem
                ]}
                onPress={() => setSelectedRecord(record)}
              >
                <Text style={styles.historyDate}>{record.testDate}</Text>
                <View style={styles.historyMetrics}>
                  <Text style={styles.historyWeight}>{record.weight.toFixed(1)}kg</Text>
                  <Text style={styles.historyBodyFat}>{record.bodyFatRate.toFixed(1)}%</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {bodyData.length === 0 && (
          <View style={styles.emptyContainer}>
            <User size={64} color="#ccc" />
            <Text style={styles.emptyText}>暂无体测数据</Text>
            <Text style={styles.emptySubtext}>请前往前台进行体测</Text>
          </View>
        )}

        {/* 底部间距 */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 16,
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF6347',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  overviewSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  dateIcon: {
    marginRight: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  trendContainer: {
    marginLeft: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricUnit: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionCard: {
    backgroundColor: '#f0f9f0',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 4,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  chartSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeSelector: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  selectorText: {
    fontSize: 14,
    color: '#666',
  },
  activeSelectorText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  chart: {
    borderRadius: 16,
  },
  historySection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedHistoryItem: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    marginHorizontal: -8,
    borderRadius: 4,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  historyMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyWeight: {
    fontSize: 14,
    marginRight: 12,
  },
  historyBodyFat: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
});

export default BodyMetrics;