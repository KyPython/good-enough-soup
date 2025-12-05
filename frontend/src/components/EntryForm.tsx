import React, { useState } from 'react';
import './EntryForm.css';

interface Entry {
  id: string;
  date: string;
  text: string;
}

const API_URL = 'http://localhost:3001';

const EntryForm: React.FC = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setMessage({ type: 'error', text: 'Please enter a win or note' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, text }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save entry');
      }

      setText('');
      setMessage({ type: 'success', text: 'Entry saved!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
      
      // Trigger refresh of entry list
      window.dispatchEvent(new Event('entriesUpdated'));
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to save entry' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="EntryForm">
      <h2>Add a Win</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">What went well today?</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your win or note..."
            rows={4}
            required
          />
        </div>
        {message && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
};

export default EntryForm;

