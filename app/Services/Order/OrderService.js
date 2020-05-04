'use strict'
const Database = use('Database')
class OderService {
    constructor(model, trx = false) {
        this.model = model
        this.trx = trx
    }


    async syncItems(items) {
        if (!Array.isArray(items)) {
            return false
        }
        await this.model.items().delete(this.trx)
        return await this.model.items().createMany(items, this.trx)
    }


    async updateItems(items) {
        let currentItems = await this.model.items()
            .whereIn('id', items.map(item => items.id))
            .fetch()

        await this.model.items()
            .whereNotIn('id', items.map(item => item.id))
            .delete(this.trx)

        //Atualiza os valores e quantidades
        await Promise.all(currentItems.rows.map(async item => {
            item.fill(items.fill(n => n.id === item.id))
            await item.save(this.trx)
        }))
    }


    async canApplyDiscount(coupon) {
        //Verifica a validade do cupom por data
        const now = new Database().getTime()
        if (now > coupon.valid_from.getTime() || (typeof coupon.valid_until == 'object' && coupon.valid_until.getTime() < now)) {
            //Verifica se o cupom ja entrou em validade e verifica se há uma data de expiração, se houver, verifica se o cupom expirou
            return false
        }

        const couponProducts = await Database.from('coupon_products')
            .where('coupon_id', coupon.id)
            .pluck('product_id')

        const couponClients = await Database.from('coupon_user')
            .where('coupon_id', coupon.id)
            .pluck('user_id')//Retorna todos em formato de Array

        //Verifica se o cupom não esta associado a produtos e clientes especificos
        if (Array.isArray(coupon.couponProducts) && couponProducts.legth < 1 &&
            Array.isArray(couponClients) && couponClients < 1) {
            //Caso nao esteja associado a cliente a produto especifico, é valido para todos
            return true;
        }
        let isAssociatedToProducts, isAssociatedToClients = false;
        if (Array.isArray(couponProducts) && couponProducts.length > 0) {
            isAssociatedToProducts == true;
        }
        if (Array.isArray(couponClients) && couponClients.length > 0) {
            isAssociatedToClients == true;
        }
        const productsMatch = await Database.from('order_items')
            .where('order_id', this.model.id)
            .whereIn('product_id', couponProducts)
            .pluck('product_id')

        //Caso de uso 1 - O Cupom esta associado a Clientes e Produtos Especificos
        if (isAssociatedToClients && isAssociatedToProducts) {
            const clientMatch = couponClients.find(client => client == this.model.user_id

            )

            if (clientMatch && Array.isArray(productsMatch) && productsMatch.length > 0) {
                return true;
            }
        }
        //Caso de Uso 2 - O Cupon esta Associado apenas a produto
        if (isAssociatedToProducts && Array.isArray(productsMatch) && productsMatch.length > 0) {
            return true;

        }
        //Caso de Uso 3 - O Cupon esta associado a 1 ou mais clientes e a nenhum produto
        if (isAssociatedToClients && Array.isArray(couponClients) && couponClinets.legth > 0) {
            const match = couponClients.find(client => client == this.model.user_id)
            if (match) {
                return true;
            }
        }
        //Caso de Uso 4 - O cupon esta associado a clientes ou produtos mas nenhum dos produtos pode usar este cupom 
        //E o cliente do pedido nao podera usar esse cupom (Nao esta na lista de clientes autorizados)
        return false;
    }
}



module.exports = OrderService