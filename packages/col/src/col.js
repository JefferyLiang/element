export default {
  name: 'ElCol',

  props: {
    // 组件占用的列数
    span: {
      type: Number,
      default: 24
    },
    // 组件的夫标签类型
    tag: {
      type: String,
      default: 'div'
    },
    // offset, pull, push 与其相关的是的css属性
    offset: Number,
    pull: Number,
    push: Number,
    // 
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter() {
      // 获取父组件
      let parent = this.$parent;
      // 寻找上级组件中的 `el-row` 组件
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent;
      }
      // 如果有gutter属性则返回他的值，没有则返回0
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    // 组建的类列表
    let classList = [];
    // 组建的动态属性
    let style = {};

    // 根据获取父组件 el-row 的 gutter值，设置本组件的左右padding值
    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    /**
     * 根据配置信息配置组件的类属性
     * 具体的css可查看 /packages/theme-chalk/src/col.scss 文件
     */

    // 根据Prop中的几个偏移参数设置组件的位置
    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `el-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`
        );
      }
    });

    // 根据Prop的设置响应式布局的列数
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        // 如果对应的Prop是数字，则直接根据数字设置
        classList.push(`el-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        // 如果响应式布局对应的是Object对象
        // 则根据对象信息配置类
        // 具体可选选: 'span', 'offset', 'pull', 'push'
        let props = this[size];
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          );
        });
      }
    });

    /**
     * 运行render去渲染组件
     * 相关API说文 https://cn.vuejs.org/v2/api/#render
     */
    return h(this.tag, {
      class: ['el-col', classList],
      style
    }, this.$slots.default);
  }
};
