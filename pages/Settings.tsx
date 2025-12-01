import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeManager, useTheme } from '../utils/ThemeManager';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const theme = useTheme();
  const isSeniorMode = themeManager.isSeniorMode();

  // 切换主题模式
  const toggleThemeMode = () => {
    themeManager.toggleMode();
  };

  // 设置项组件
  const SettingItem: React.FC<{
    icon: string;
    title: string;
    value?: string;
    onPress?: () => void;
    showArrow?: boolean;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
  }> = ({
    icon,
    title,
    value,
    onPress,
    showArrow = false,
    showSwitch = false,
    switchValue = false,
    onSwitchChange
  }) => (
    <TouchableOpacity 
      style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}
      onPress={onPress}
      disabled={!onPress && !showSwitch}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color={theme.colors.primary} />
        <Text style={[styles.settingTitle, { fontSize: theme.fonts.medium, color: theme.colors.text }]}>
          {title}
        </Text>
      </View>
      <View style={styles.settingRight}>
        {value && (
          <Text style={[styles.settingValue, { fontSize: theme.fonts.regular, color: theme.colors.subText }]}>
            {value}
          </Text>
        )}
        {showArrow && (
          <Ionicons name="chevron-forward" size={20} color={theme.colors.subText} />
        )}
        {showSwitch && (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor="#ffffff"
            ios_backgroundColor="#3e3e3e"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      {/* 顶部导航栏 */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: theme.fonts.large, color: '#ffffff' }]}>
          设置
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* 设置内容 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 显示设置 */}
        <View style={[styles.section, { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.xs }]}>
          <Text style={[styles.sectionTitle, { fontSize: theme.fonts.small, color: '#ffffff' }]}>
            显示设置
          </Text>
        </View>
        <View style={[styles.sectionContent, { backgroundColor: theme.colors.bg }]}>
          <SettingItem
            icon="accessibility"
            title="适老化模式"
            value={isSeniorMode ? '开启' : '关闭'}
            showSwitch={true}
            switchValue={isSeniorMode}
            onSwitchChange={toggleThemeMode}
          />
          <SettingItem
            icon="color-palette"
            title="深色模式"
            value="跟随系统"
            showArrow={true}
            onPress={() => {}}
          />
        </View>

        {/* 账户与安全 */}
        <View style={[styles.section, { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.xs }]}>
          <Text style={[styles.sectionTitle, { fontSize: theme.fonts.small, color: '#ffffff' }]}>
            账户与安全
          </Text>
        </View>
        <View style={[styles.sectionContent, { backgroundColor: theme.colors.bg }]}>
          <SettingItem
            icon="lock-closed"
            title="修改密码"
            showArrow={true}
            onPress={() => {}}
          />
          <SettingItem
            icon="shield-checkmark"
            title="安全设置"
            showArrow={true}
            onPress={() => {}}
          />
        </View>

        {/* 通知设置 */}
        <View style={[styles.section, { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.xs }]}>
          <Text style={[styles.sectionTitle, { fontSize: theme.fonts.small, color: '#ffffff' }]}>
            通知设置
          </Text>
        </View>
        <View style={[styles.sectionContent, { backgroundColor: theme.colors.bg }]}>
          <SettingItem
            icon="notifications"
            title="课程提醒"
            showSwitch={true}
            switchValue={true}
            onSwitchChange={() => {}}
          />
          <SettingItem
            icon="calendar"
            title="预约成功通知"
            showSwitch={true}
            switchValue={true}
            onSwitchChange={() => {}}
          />
        </View>

        {/* 关于 */}
        <View style={[styles.section, { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.xs }]}>
          <Text style={[styles.sectionTitle, { fontSize: theme.fonts.small, color: '#ffffff' }]}>
            关于
          </Text>
        </View>
        <View style={[styles.sectionContent, { backgroundColor: theme.colors.bg }]}>
          <SettingItem
            icon="information-circle"
            title="关于我们"
            showArrow={true}
            onPress={() => {}}
          />
          <SettingItem
            icon="document-text"
            title="用户协议"
            showArrow={true}
            onPress={() => {}}
          />
          <SettingItem
            icon="shield-checkmark-circle"
            title="隐私政策"
            showArrow={true}
            onPress={() => {}}
          />
          <SettingItem
            icon="help-circle"
            title="帮助中心"
            showArrow={true}
            onPress={() => {}}
          />
          <SettingItem
            icon="code-slash"
            title="版本信息"
            value="v1.0.0"
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontWeight: '500',
  },
  sectionContent: {
    marginTop: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    marginRight: 8,
  },
});

export default Settings;