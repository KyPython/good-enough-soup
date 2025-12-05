import React, { useState, useEffect } from 'react';
import './EntryList.css';

interface Entry {
  id: string;
  date: string;
  text: string;
}

const API_URL = 'http://localhost:3001';

const EntryList: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/entries`);
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await response.json();
      setEntries(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load entries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
    
    // Listen for entries updated event
    const handleUpdate = () => {
      fetchEntries();
    };
    window.addEventListener('entriesUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('entriesUpdated', handleUpdate);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  if (isLoading) {
    return (
      <div className="EntryList">
        <h2>Recent Entries</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="EntryList">
        <h2>Recent Entries</h2>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="EntryList">
      <h2>Recent Entries</h2>
      {entries.length === 0 ? (
        <div className="empty">No entries yet. Add your first win above!</div>
      ) : (
        <ul className="entries-list">
          {entries.map((entry) => (
            <li key={entry.id} className="entry-item">
              <div className="entry-date">{formatDate(entry.date)}</div>
              <div className="entry-text">{entry.text}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryList;

