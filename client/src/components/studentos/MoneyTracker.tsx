import React, { useState } from 'react';
import { 
  DollarSign, 
  PlusCircle, 
  TrendingUp, 
  PiggyBank, 
  Wallet, 
  Trash2, 
  PieChart as PieChartIcon, 
  BarChart3, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ExpenseItem, SavingsGoal, ThemeMode } from '../../types/studentos';

interface MoneyTrackerProps {
  expenses: ExpenseItem[];
  savings: SavingsGoal;
  onAddExpense: (item: Omit<ExpenseItem, 'id'>) => void;
  onDeleteExpense: (id: string) => void;
  onUpdateSavings: (newSavings: Partial<SavingsGoal>) => void;
  theme: ThemeMode;
}

const CATEGORY_COLORS = {
  'Food': '#10B981',
  'Books & Supplies': '#3B82F6',
  'Transport': '#F59E0B',
  'Outings': '#EC4899',
  'Subscriptions': '#8B5CF6',
  'Other': '#6B7280'
};

export const MoneyTracker: React.FC<MoneyTrackerProps> = ({
  expenses,
  savings,
  onAddExpense,
  onDeleteExpense,
  onUpdateSavings,
  theme
}) => {
  const isDark = theme === 'dark';

  // New Expense form state
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseItem['category']>('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Savings add state
  const [addSavingsAmount, setAddSavingsAmount] = useState('');
  const [isAddingSavings, setIsAddingSavings] = useState(false);

  const totalExpenseAmount = expenses.reduce((acc, item) => acc + item.amount, 0);
  const budgetUsedPercentage = Math.min(100, Math.round((totalExpenseAmount / savings.monthlyBudget) * 100));

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0) return;

    onAddExpense({
      title: title.trim(),
      amount: Number(amount),
      category,
      date
    });

    setTitle('');
    setAmount('');
  };

  const handleDepositSavings = () => {
    const val = Number(addSavingsAmount);
    if (val > 0) {
      onUpdateSavings({
        currentSaved: savings.currentSaved + val
      });
      setAddSavingsAmount('');
      setIsAddingSavings(false);
    }
  };

  // Prepare chart data for Category Pie Chart
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const pieChartData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat],
    color: CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] || '#6B7280'
  }));

  // Savings Goal percentage
  const savingsPercentage = Math.min(100, Math.round((savings.currentSaved / savings.targetAmount) * 100));

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              💰 Student Money & Expense Tracker
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Keep control of your pocket money, monthly budget limits, and personal savings goals.
            </p>
          </div>
        </div>

        {/* 3 Metric Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          
          {/* Box 1: Total Spent */}
          <div className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Total Monthly Spent</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-extrabold text-emerald-400">
              ₹{totalExpenseAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Budget: ₹{savings.monthlyBudget.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Box 2: Budget Usage Bar */}
          <div className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Budget Usage</span>
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-xl font-extrabold text-slate-100">
              {budgetUsedPercentage}% <span className="text-xs font-normal text-slate-400">Used</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  budgetUsedPercentage > 90 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
                style={{ width: `${budgetUsedPercentage}%` }}
              />
            </div>
          </div>

          {/* Box 3: Savings Goal */}
          <div className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Savings Goal ({savingsPercentage}%)</span>
              <PiggyBank className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-extrabold text-amber-400">
                ₹{savings.currentSaved.toLocaleString('en-IN')}
              </div>
              <button
                onClick={() => setIsAddingSavings(!isAddingSavings)}
                className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 font-bold"
              >
                + Add
              </button>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Target: ₹{savings.targetAmount.toLocaleString('en-IN')}
            </div>
          </div>

        </div>

        {/* Deposit Savings Popup Input */}
        {isAddingSavings && (
          <div className={`mt-4 p-4 rounded-2xl border flex items-center gap-3 ${
            isDark ? 'bg-slate-950 border-amber-500/30' : 'bg-amber-50 border-amber-200'
          }`}>
            <input
              type="number"
              placeholder="Enter savings deposit amount (₹)..."
              value={addSavingsAmount}
              onChange={(e) => setAddSavingsAmount(e.target.value)}
              className={`flex-1 px-3 py-2 text-xs rounded-xl border outline-none font-semibold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
            <button
              onClick={handleDepositSavings}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 text-white hover:bg-amber-600 shadow-md"
            >
              Deposit
            </button>
          </div>
        )}
      </div>

      {/* Grid Layout: Add Expense + Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form: Add New Expense */}
        <div className={`p-6 rounded-3xl border ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            Log New Expense
          </h3>

          <form onSubmit={handleCreateExpense} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Expense Description
              </label>
              <input
                type="text"
                placeholder="e.g. Textbook print, Bus fare, Canteen snack..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Amount (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 250"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-semibold ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="Food">Food & Canteen</option>
                <option value="Books & Supplies">Books & Supplies</option>
                <option value="Transport">Transport & Travel</option>
                <option value="Outings">Outings & Entertainment</option>
                <option value="Subscriptions">Subscriptions & Bills</option>
                <option value="Other">Other Expenses</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-opacity"
            >
              Log Expense
            </button>
          </form>
        </div>

        {/* Visual Recharts Pie Breakdown */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border flex flex-col justify-between ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <PieChartIcon className="w-5 h-5 text-teal-400" />
              Category Breakdown & Spending Analytics
            </h3>

            {pieChartData.length > 0 ? (
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Spent']}
                      contentStyle={{ backgroundColor: isDark ? '#0F172A' : '#FFFFFF', borderRadius: '12px', borderColor: '#334155' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-56 flex items-center justify-center text-slate-500 text-xs">
                No expense data logged yet. Add your first expense on the left!
              </div>
            )}
          </div>

          {/* Category Badges legend */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/40">
            {pieChartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item.name}:</span>
                <span className="font-extrabold text-emerald-400">₹{item.value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Expense History Table */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          📋 Recent Expense History
        </h3>

        {expenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Expense Title</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {expenses.map((exp) => (
                  <tr key={exp.id} className={isDark ? 'hover:bg-slate-950/50' : 'hover:bg-slate-50'}>
                    <td className="py-3 px-3 text-slate-400 font-mono">{exp.date}</td>
                    <td className="py-3 px-3 font-semibold text-slate-200">{exp.title}</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-full font-medium text-[10px] border border-slate-700 bg-slate-800 text-slate-300">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-extrabold text-emerald-400">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onDeleteExpense(exp.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Delete expense"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            No expenses recorded yet.
          </div>
        )}
      </div>

    </div>
  );
};
