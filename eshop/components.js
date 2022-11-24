Vue.component("goods-list", {
  name: "goods-list",
  props: ["goods", "addToCart"],
  template: `
            <div v-if="goods.length !== 0" class="goods-list">
                <div class="goods-item" v-for="good in goods">
                    <goods-item @add-to-cart="addToCart" :good="good"></goods-item>
                </div>
            </div>
            <div v-else>Нет данных</div>
            `,
});

Vue.component("goods-item", {
  name: "goods-item",
  props: ["good"],
  template: `
                <div>
                  <div class="wrap-item">
                    <h3>{{ good.product_name }}</h3>
                    <p>{{ good.price }}</p>
                  </div>
                    <button @click="$emit('add-to-cart', good)" class="button-add">Добавить</button>
                </div>
            `,
});

Vue.component("goods-search", {
  name: "goods-search",
  props: ["searchLine"],
  template: `
        <div>
            <input :value="searchLine" @input="$emit('input', $event.target.value)" type="text" class="goods-search" />
            <button @click="$emit('filter-goods')" class="search-button" type="button">Искать</button>
        </div>
    `,
});

Vue.component("cart", {
  name: "cart",
  props: ["goods", "deleteFromCart"],
  data: () => ({
    isVisibleCart: false,
  }),
  methods: {
    handleCart() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },
  template: `
            <div>
                <button @click="handleCart" class="cart-button" type="button">Корзина</button>
                <div v-show="isVisibleCart" class="cart">
                    <div>Корзина</div>
                    <div v-if="goods.length !== 0" class="goods-list">
                        <div class="goods-item" v-for="good in goods" :key="good.price">
                            <cart-item @delete-from-cart="deleteFromCart" :good="good" />
                        </div>
                    </div>
                    <div v-else>Корзина пуста</div>
                </div>
            </div>
        `,
});

Vue.component("cart-item", {
  name: "goods-item",
  props: ["good"],
  template: `
       <div>
          <h3>{{ good.product_name }}</h3>
          <p>{{ good.price }}</p>
          <button @click.prevent="$emit('delete-from-cart', good)">Удалить</button>
       </div>    
    `,
});
