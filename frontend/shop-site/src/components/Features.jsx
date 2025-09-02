//import { motion } from 'framer-motion'
import { Recycle, Palette, Users, Award } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Recycle className="h-8 w-8" />,
      title: "Print-on-Demand",
      subtitle: "Nachhaltigkeit",
      description: "Unsere Print-on-Demand Produktion vermeidet Überproduktion und reduziert Abfall. Jedes Produkt wird erst nach Bestellung gefertigt - für eine nachhaltigere Zukunft.",
      color: "text-green-500"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Moderne Designs",
      subtitle: "Innovation",
      description: "Unsere Designs verbinden zeitlose Ästhetik mit innovativen Elementen. Jedes Produkt erzählt eine Geschichte von Licht, Style und modernem Lifestyle.",
      color: "text-blue-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community-Driven",
      subtitle: "Zusammen stark",
      description: "Unsere Community steht im Mittelpunkt. Durch Social Media Integration und direktes Feedback gestalten wir gemeinsam die Zukunft von Lumio.",
      color: "text-purple-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Qualität & Innovation",
      subtitle: "Exzellenz",
      description: "Höchste Qualitätsstandards treffen auf innovative Technologie. Jedes Produkt durchläuft strenge Qualitätskontrollen für maximale Kundenzufriedenheit.",
      color: "text-orange-500"
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
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
            Warum Lumio?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Entdecke, was Lumio zu mehr als nur einer Marke macht. 
            Unsere Werte und unser Engagement für Qualität, Innovation und Nachhaltigkeit.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 border border-border card-hover h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${feature.color} bg-current/10 group-hover:bg-current/20 transition-all duration-300`}>
                    <div className={`${feature.color}`}>
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="mb-2">
                    <span className={`text-sm font-medium ${feature.color}`}>
                      {feature.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Bereit für den nächsten Level?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Werde Teil der Lumio-Community und erlebe, wie Innovation und Style 
              dein Leben zum Leuchten bringen können.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium glow-effect hover:bg-primary/90 transition-all duration-300"
              >
                Community beitreten
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Mehr erfahren
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features

