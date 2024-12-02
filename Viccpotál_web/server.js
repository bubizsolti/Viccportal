const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Serve static files from the Frontend directory
app.use(express.static('Frontend'));

// Initialize Supabase client
const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNzc5OTUsImV4cCI6MjA0ODY1Mzk5NX0.1ji2U75AbU0_qD1iXosgHKgTPIY18LTHMkDZEi9nS1k';
const supabase = createClient(supabaseUrl, supabaseKey);

// API endpoint to fetch jokes with optional category filter
app.get('/api/jokes', async (req, res) => {
    try {
        const { category } = req.query;
        let query = supabase
            .from('Viccportál')
            .select('*');
            
        if (category) {
            query = query.eq('kategoriak', category);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error fetching jokes:', error);
        res.status(500).send('Error fetching jokes');
    }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend/Html/Home.html'));
});

// Handle all other routes to serve the corresponding HTML files
app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'Frontend/Html', page));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
