// utils/chartUtils.js

/**
 * 绘制柱状图
 * @param {string} canvasId - canvas-id
 * @param {Array} data - 数据数组 [{name, value}]
 */
export const drawBarChart = (canvasId, data) => {
  const ctx = wx.createCanvasContext(canvasId);
  const width = wx.getSystemInfoSync().windowWidth - 80; // 减去padding
  const height = 280;
  const padding = 40;
  const barWidth = (width - padding * 2) / data.length * 0.6;
  const maxValue = Math.max(...data.map(item => item.value)) * 1.2;
  
  // 清空画布
  ctx.setFillStyle('#ffffff');
  ctx.fillRect(0, 0, width, height);
  
  // 绘制坐标轴
  ctx.setStrokeStyle('#e0e0e0');
  ctx.beginPath();
  // X轴
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  // Y轴
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.stroke();
  
  // 绘制柱状图
  data.forEach((item, index) => {
    const x = padding + (barWidth * 1.5) * index + barWidth * 0.2;
    const barHeight = (item.value / maxValue) * (height - padding * 2);
    const y = height - padding - barHeight;
    
    // 柱状图
    ctx.setFillStyle('#07c160');
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // 数值标签
    ctx.setFontSize(12);
    ctx.setFillStyle('#666666');
    ctx.setTextAlign('center');
    ctx.fillText(item.value, x + barWidth / 2, y - 5);
    
    // 名称标签
    ctx.setFillStyle('#999999');
    ctx.fillText(item.name, x + barWidth / 2, height - padding + 20);
  });
  
  ctx.draw();
};

/**
 * 绘制折线图
 * @param {string} canvasId - canvas-id
 * @param {Array} data - 数据数组 [{date, value}]
 */
export const drawLineChart = (canvasId, data) => {
  const ctx = wx.createCanvasContext(canvasId);
  const width = wx.getSystemInfoSync().windowWidth - 80; // 减去padding
  const height = 280;
  const padding = 40;
  const maxValue = Math.max(...data.map(item => item.value)) * 1.2;
  
  // 清空画布
  ctx.setFillStyle('#ffffff');
  ctx.fillRect(0, 0, width, height);
  
  // 绘制坐标轴
  ctx.setStrokeStyle('#e0e0e0');
  ctx.beginPath();
  // X轴
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  // Y轴
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.stroke();
  
  // 绘制折线
  ctx.setStrokeStyle('#07c160');
  ctx.setLineWidth(2);
  ctx.beginPath();
  
  data.forEach((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (item.value / maxValue) * (height - padding * 2);
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    // 绘制数据点
    ctx.setFillStyle('#07c160');
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    // 日期标签
    ctx.setFontSize(12);
    ctx.setFillStyle('#999999');
    ctx.setTextAlign('center');
    ctx.fillText(item.date, x, height - padding + 20);
  });
  
  ctx.stroke();
  ctx.draw();
};

/**
 * 导出chartUtils实例
 */
export const chartUtils = {
  drawBarChart,
  drawLineChart
};