// pages/Home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recommendedCourses: [],
    popularCourses: [],
    filterTags: ['减脂', '增肌', '瑜伽', '有氧运动', '力量训练', '普拉提'],
    selectedTags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadCourses();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 如果页面重新显示，可以刷新数据
    if (this.data.recommendedCourses.length === 0) {
      this.loadCourses();
    }
  },

  /**
   * 加载课程数据
   */
  loadCourses() {
    // 模拟课程数据
    const recommendedCourses = [
      { id: '1', name: '晨间瑜伽', timeStart: '08:00', rating: 4.8 },
      { id: '2', name: '高强度间歇', timeStart: '12:30', rating: 4.9 },
      { id: '3', name: '傍晚游泳课', timeStart: '18:00', rating: 4.7 }
    ];

    const popularCourses = [
      { id: '1', name: '腹肌训练', timeStart: '19:00', rating: 4.9 },
      { id: '2', name: '瑜伽基础', timeStart: '09:30', rating: 4.8 },
      { id: '3', name: '有氧健身操', timeStart: '17:00', rating: 4.7 },
      { id: '4', name: '力量训练', timeStart: '16:00', rating: 4.6 },
      { id: '5', name: '拉伸放松', timeStart: '20:00', rating: 4.5 }
    ];

    this.setData({
      recommendedCourses,
      popularCourses
    });
  },

  /**
   * 导航到课程详情页
   */
  navigateToCourseDetail(e) {
    const courseId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/CourseDetail/CourseDetail?id=${courseId}`
    });
  },

  /**
   * 切换标签选择状态
   */
  toggleTag(e) {
    const tag = e.currentTarget.dataset.tag;
    const { selectedTags } = this.data;
    let newSelectedTags;

    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter(t => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }

    this.setData({
      selectedTags: newSelectedTags
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.loadCourses();
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: 'FitLife健身小程序',
      path: '/pages/Home/Home'
    };
  }
})