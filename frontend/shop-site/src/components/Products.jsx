//import React, { useState } from 'react'
//import { motion } from 'framer-motion' 
import { Button } from '@/components/ui/button'
import { ShoppingCart, ExternalLink, Star } from 'lucide-react'
import tshirtMockup from '../assets/tshirt_mockup.jpg'
import ledGadget from '../assets/led_gadget.jpg'

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Lumio Signature T-Shirt",
      category: "Fashion",
      price: "29,99 €",
      originalPrice: "39,99 €",
      image: tshirtMockup,
      description: "Minimalistisches Design mit subtilen Lumio-Elementen. Premium Baumwolle für höchsten Tragekomfort.",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isSale: true
    },
    {
      id: 2,
      name: "LED Smart Strip",
      category: "LED-Gadgets",
      price: "49,99 €",
      originalPrice: null,
      image: ledGadget,
      description: "Intelligente LED-Beleuchtung mit App-Steuerung. Millionen von Farben für die perfekte Atmosphäre.",
      rating: 4.9,
      reviews: 89,
      isNew: false,
      isSale: false
    },
    {
      id: 3,
      name: "Lumio Hoodie Premium",
      category: "Fashion",
      price: "69,99 €",
      originalPrice: "79,99 €",
      image: tshirtMockup,
      description: "Luxuriöser Hoodie mit eingebauten LED-Akzenten. Perfekt für den modernen Lifestyle.",
      rating: 4.7,
      reviews: 67,
      isNew: true,
      isSale: true
    },
    {
      id: 4,
      name: "Wireless LED Cube",
      category: "LED-Gadgets",
      price: "89,99 €",
      originalPrice: null,
      image: ledGadget,
      description: "Kabelloser LED-Würfel mit Musiksynchronisation. Verwandle jeden Raum in eine Lichtshow.",
      rating: 4.6,
      reviews: 156,
      isNew: false,
      isSale: false
    },
    {
      id: 5,
      name: "Lumio Cap Collection",
      category: "Accessoires",
      price: "24,99 €",
      originalPrice: null,
      image: tshirtMockup,
      description: "Stylische Caps mit reflektierenden Lumio-Details. Für den perfekten Street-Style Look.",
      rating: 4.5,
      reviews: 93,
      isNew: false,
      isSale: false
    },
    {
      id: 6,
      name: "Smart LED Panel",
      category: "LED-Gadgets",
      price: "129,99 €",
      originalPrice: "149,99 €",
      image: ledGadget,
      description: "Modulares LED-Panel-System. Erstelle deine eigenen Lichtkunstwerke an der Wand.",
      rating: 4.9,
      reviews: 201,
      isNew: true,
      isSale: true
    }
  ]

  const categories = ["Alle", "Fashion", "LED-Gadgets", "Accessoires"]

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Unsere Produkte
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Entdecke unsere einzigartige Kollektion aus Mode, LED-Gadgets und Accessoires. 
            Jedes Produkt wurde sorgfältig ausgewählt, um deinen Style zu perfektionieren.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className="hover:scale-105 transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border card-hover">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Neu
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-destructive text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Category */}
                  <div className="text-sm text-primary font-medium mb-2">
                    {product.category}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button className="glow-effect hover:scale-105 transition-all duration-300">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Kaufen
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button size="lg" className="glow-effect hover:scale-105 transition-all duration-300">
            Alle Produkte anzeigen
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Products

