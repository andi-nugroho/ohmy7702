
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle, CircleCheck, LayoutDashboard, MessageSquare, SquareCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BatchTransactionInterface from "@/components/BatchTransactionInterface";

const Index = () => {
  const [achievements, setAchievements] = useState([
    { id: 1, name: "First Batch", unlocked: false },
    { id: 2, name: "Gas Saver", unlocked: false },
    { id: 3, name: "EIP-7702 Pioneer", unlocked: true },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-900/20">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-web3 opacity-10"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-web3-purple/20 border border-web3-purple/30 text-web3-purple text-sm font-medium mb-6">
              <Circle className="w-4 h-4 mr-2 animate-pulse" />
              EIP-7702 Enabled
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-web3-purple to-web3-blue bg-clip-text text-transparent glow-text">
              Ohmy7702
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of Web3 with <span className="text-web3-purple font-semibold">gasless</span> and 
              <span className="text-web3-blue font-semibold"> batching transactions</span> powered by EIP-7702
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg rounded-full border-web3-purple/30 text-web3-purple hover:bg-web3-purple/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 space-y-16">
        {/* Batch Transaction Interface */}
        <section className="relative">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Batch & Save
                <span className="block text-web3-purple">with Paymaster</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Bundle multiple transactions into a single batch and let our paymaster cover the gas fees. 
                Experience true gasless transactions with EIP-7702 account abstraction.
              </p>
              
              <div className="flex justify-center space-x-8 mt-6">
                <div className="flex items-center text-neon-green">
                  <CircleCheck className="w-5 h-5 mr-3" />
                  <span>Zero gas fees for users</span>
                </div>
                <div className="flex items-center text-neon-green">
                  <CircleCheck className="w-5 h-5 mr-3" />
                  <span>Intelligent transaction batching</span>
                </div>
                <div className="flex items-center text-neon-green">
                  <CircleCheck className="w-5 h-5 mr-3" />
                  <span>EIP-7702 account abstraction</span>
                </div>
              </div>
            </div>
            
            <BatchTransactionInterface />
          </div>
        </section>

        {/* Achievements Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Your Achievements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock rewards as you explore the capabilities of EIP-7702 and gasless transactions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`glass-card transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'animate-pulse-glow border-neon-green/30' 
                    : 'opacity-60'
                }`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-neon-green/20 to-neon-orange/20 border-2 border-neon-green/50' 
                      : 'bg-white/5 border-2 border-white/20'
                  }`}>
                    {achievement.unlocked ? (
                      <SquareCheck className="w-8 h-8 text-neon-green" />
                    ) : (
                      <Circle className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{achievement.name}</h3>
                    {achievement.unlocked && (
                      <Badge className="achievement-badge mt-2">
                        Unlocked!
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Ohmy7702?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built on cutting-edge Ethereum technology for the next generation of Web3 applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Circle className="w-8 h-8 text-web3-purple" />,
                title: "EIP-7702 Native",
                description: "Built specifically for EIP-7702 account abstraction standard"
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-web3-blue" />,
                title: "Smart Batching",
                description: "Intelligent transaction bundling for optimal gas efficiency"
              },
              {
                icon: <SquareCheck className="w-8 h-8 text-neon-green" />,
                title: "Gasless UX",
                description: "Seamless user experience with paymaster integration"
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card hover:shadow-lg hover:shadow-web3-purple/10 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-card flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-web3-purple to-web3-blue bg-clip-text text-transparent">
              Ohmy7702
            </h3>
            <p className="text-muted-foreground">
              Pioneering the future of gasless Web3 transactions
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <span>Built with EIP-7702</span>
              <span>•</span>
              <span>Powered by Paymaster</span>
              <span>•</span>
              <span>Next-Gen Web3</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
