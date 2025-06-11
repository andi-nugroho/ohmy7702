
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Zap, DollarSign, Clock, ArrowRight, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: string;
  to: string;
  amount: string;
  gasEstimate: number;
  selected: boolean;
}

const BatchTransactionInterface = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'Transfer',
      to: '0x742d35Cc6639C0532fEb5027f11d6E5a3d6Ac',
      amount: '0.1',
      gasEstimate: 21000,
      selected: true
    },
    {
      id: '2',
      type: 'Swap',
      to: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      amount: '100',
      gasEstimate: 150000,
      selected: true
    },
    {
      id: '3',
      type: 'Approve',
      to: '0xA0b86a33E6411A3b9e3e79C9f75e5a08f2e9c63d',
      amount: 'Unlimited',
      gasEstimate: 45000,
      selected: false
    }
  ]);

  const [gaslessEnabled, setGaslessEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [newTransaction, setNewTransaction] = useState({ type: '', to: '', amount: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const selectedTransactions = transactions.filter(tx => tx.selected);
  const totalGasEstimate = selectedTransactions.reduce((sum, tx) => sum + tx.gasEstimate, 0);
  const estimatedGasCost = (totalGasEstimate * 20) / 1e9;

  const handleTransactionToggle = (id: string) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.id === id ? { ...tx, selected: !tx.selected } : tx
      )
    );
  };

  const handleRemoveTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const handleAddTransaction = () => {
    if (newTransaction.type && newTransaction.to && newTransaction.amount) {
      const newTx: Transaction = {
        id: Date.now().toString(),
        type: newTransaction.type,
        to: newTransaction.to,
        amount: newTransaction.amount,
        gasEstimate: Math.floor(Math.random() * 100000) + 21000,
        selected: true
      };
      setTransactions(prev => [...prev, newTx]);
      setNewTransaction({ type: '', to: '', amount: '' });
      setShowAddForm(false);
    }
  };

  const executeBatch = async () => {
    if (selectedTransactions.length === 0) {
      toast({
        title: "No transactions selected",
        description: "Please select at least one transaction to batch.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setBatchProgress(0);

    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setBatchProgress(i);
      
      if (i === 40 && gaslessEnabled) {
        toast({
          title: "Paymaster Activated! ⚡",
          description: "Gas fees are being sponsored for your transactions.",
        });
      }
      
      if (i === 80) {
        toast({
          title: "Transactions Bundled 📦",
          description: `${selectedTransactions.length} transactions batched successfully.`,
        });
      }
    }

    setIsProcessing(false);
    toast({
      title: "Batch Complete! ✨",
      description: gaslessEnabled 
        ? "All transactions executed gaslessly via paymaster."
        : `Batch executed. Total gas used: ${totalGasEstimate.toLocaleString()}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Compact Stats Header */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="glass-card border-web3-purple/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Selected</p>
                <p className="text-xl font-bold text-web3-purple">{selectedTransactions.length}</p>
              </div>
              <Layers className="w-6 h-6 text-web3-purple/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-web3-blue/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Gas Est.</p>
                <p className="text-xl font-bold text-web3-blue">{(totalGasEstimate / 1000).toFixed(1)}k</p>
              </div>
              <Zap className="w-6 h-6 text-web3-blue/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-neon-green/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Cost</p>
                <p className="text-xl font-bold text-neon-green">
                  {gaslessEnabled ? '$0.00' : `$${(estimatedGasCost * 2000).toFixed(2)}`}
                </p>
              </div>
              <DollarSign className="w-6 h-6 text-neon-green/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar (when processing) */}
      {isProcessing && (
        <Card className="glass-card border-web3-purple/30 animate-pulse-glow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Processing Batch</span>
              <span className="text-sm text-web3-purple">{batchProgress}%</span>
            </div>
            <Progress value={batchProgress} className="h-2 bg-white/10" />
          </CardContent>
        </Card>
      )}

      {/* Transaction List */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Transaction Queue</CardTitle>
              <CardDescription className="text-sm">Select transactions to batch together</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
              className="glass-button border-web3-purple/30 text-xs px-3 py-1"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          {/* Add Transaction Form */}
          {showAddForm && (
            <div className="p-3 rounded-lg bg-web3-purple/5 border border-web3-purple/20 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <Input
                  placeholder="Type"
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, type: e.target.value }))}
                  className="bg-white/5 border-white/20 text-sm h-8"
                />
                <Input
                  placeholder="To Address"
                  value={newTransaction.to}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, to: e.target.value }))}
                  className="bg-white/5 border-white/20 text-sm h-8"
                />
                <Input
                  placeholder="Amount"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                  className="bg-white/5 border-white/20 text-sm h-8"
                />
                <Button onClick={handleAddTransaction} className="glass-button text-sm h-8">
                  Add
                </Button>
              </div>
            </div>
          )}

          {/* Transaction Items */}
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className={`group p-3 rounded-lg border transition-all duration-200 hover:shadow-lg ${
                tx.selected
                  ? 'bg-web3-purple/10 border-web3-purple/30 shadow-web3-purple/20'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={tx.selected}
                    onCheckedChange={(checked) => handleTransactionToggle(tx.id)}
                    className="data-[state=checked]:bg-web3-purple data-[state=checked]:border-web3-purple"
                  />
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-card flex items-center justify-center">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{tx.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-medium text-sm">{tx.amount} ETH</div>
                    <div className="text-xs text-muted-foreground">
                      {(tx.gasEstimate / 1000).toFixed(1)}k gas
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTransaction(tx.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Gasless Paymaster Controls */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between p-3 rounded-lg bg-neon-orange/5 border border-neon-orange/20">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="gasless-toggle"
                  checked={gaslessEnabled}
                  onCheckedChange={(checked) => setGaslessEnabled(checked === true)}
                  className="data-[state=checked]:bg-neon-orange data-[state=checked]:border-neon-orange"
                />
                <div>
                  <label htmlFor="gasless-toggle" className="text-sm font-medium cursor-pointer">
                    Enable Gasless Transactions
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Use paymaster to sponsor gas fees
                  </p>
                </div>
              </div>
              {gaslessEnabled && (
                <Badge className="bg-neon-orange/20 text-neon-orange border-neon-orange/30 text-xs">
                  Paymaster Active
                </Badge>
              )}
            </div>
          </div>

          {/* Execute Button */}
          <div className="pt-2">
            <Button
              className="w-full glass-button rounded-xl py-5 text-base font-semibold"
              onClick={executeBatch}
              disabled={isProcessing || selectedTransactions.length === 0}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Processing Batch...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="w-4 h-4 mr-3" />
                  Execute Batch ({selectedTransactions.length} transactions)
                  <ArrowRight className="w-4 h-4 ml-3" />
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchTransactionInterface;
