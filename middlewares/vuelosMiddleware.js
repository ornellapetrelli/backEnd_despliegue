const validateSearchData = (req, res, next) => {
    const { origin, destination, departureDate } = req.query;
  
    if (!origin || !destination || !departureDate) {
      return res.status(400).json({ message: 'Faltan parámetros necesarios en la búsqueda.' });
    }
    if (new Date(departureDate).toString() === 'Invalid Date') {
      return res.status(400).json({ message: 'Fecha de salida no válida.' });
    }
  
    if (req.query.returnDate && new Date(req.query.returnDate).toString() === 'Invalid Date') {
      return res.status(400).json({ message: 'Fecha de vuelta no válida.' });
    }
  
    next();
  };
  
  router.get('/flights', validateSearchData, getFlights);
  