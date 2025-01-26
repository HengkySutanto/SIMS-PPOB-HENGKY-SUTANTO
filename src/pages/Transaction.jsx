import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config/api';
import Swal from "sweetalert2";
import { format } from 'date-fns';

const dummyDataOFTransactions = [
  {
    invoice_number: "INV17082023-001",
    transaction_type: "TOPUP",
    description: "Top Up balance",
    total_amount: 100000,
    created_on: "2023-08-17T10:10:10.000Z"
  },
  {
    invoice_number: "INV17082023-002",
    transaction_type: "PAYMENT",
    description: "PLN Pascabayar",
    total_amount: 10000,
    created_on: "2023-08-17T11:10:10.000Z"
  },
  {
    invoice_number: "INV17082023-003",
    transaction_type: "PAYMENT",
    description: "Pulsa Indosat",
    total_amount: 40000,
    created_on: "2023-08-17T12:10:10.000Z"
  }
]
const LIMIT = 5; // Amount of transactions to fetch per page

const Transaction = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTransactions(0);
  }, [token]);

  const fetchTransactions = async (offset) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transaction/history?offset=${offset}&limit=${LIMIT}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (data.status === 0) {
        const newTransactions = data.data.records;
        setTransactions(prev => offset === 0 ? newTransactions : [...prev, ...newTransactions]);
        setHasMore(newTransactions.length === LIMIT);
      } else if (data.status === 108) {
        Swal.fire({
          title: "<img src='/logo-1.png' class='mx-auto w-12' />",
          text: `Unauthorized User`,
          confirmButtonText: 'Close',
        });
      } else {
        console.error('Failed to fetch transactions:', data.message);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      Swal.fire({
        title: "<img src='/logo-1.png' class='mx-auto w-12' />",
        text: 'Terjadi kesalahan pada server',
        confirmButtonColor: 'white',
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = async () => {
    setLoadingMore(true);
    const newOffset = transactions.length;
    await fetchTransactions(newOffset);
  };

  const getTransactionColor = (type) => {
    return type === 'PAYMENT' ? 'text-red-500' : 'text-green-500';
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm:ss');
  };

  return (
    <div className="transaction px-5 md:px-0">
      <div className="text-lg xl:text-2xl font-bold mb-5">
        Semua Transaksi
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : transactions.length > 0 ? (
        <div className="space-y-4">
          <div className="grid gap-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.invoice_number}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className={`md:text-lg font-semibold ${getTransactionColor(transaction.transaction_type)}`}>
                      {transaction.transaction_type === 'TOPUP' ? '+' : '-'}
                      Rp {transaction.total_amount.toLocaleString('id')}
                    </div>
                    <div className="text-xs md:text-sm text-gray-300">
                      {formatDate(transaction.created_on)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-xs md:text-sm text-gray-500">{transaction.invoice_number}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
              >
                {loadingMore ? 'Loading...' : 'Show More'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full min-h-50 apply-center text-gray-300">
          Maaf tidak ada histori transaksi saat ini
        </div>
      )}
    </div>
  );
};

export default Transaction; 