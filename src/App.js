import React, { useState } from 'react';
const eventLocations = [{ id: 1, name: 'Baghajatin, Kolkata, WB', distance: 10 }, { id: 2, name: 'Garia, Kolkata, WB', distance: 20 }, { id: 3, name: 'Sealdaha, Kolkata, WB', distance: 15 }, { id: 4, name: 'Jadavpur, Kolkata, WB', distance: 25 }];

const games = [{ id: 1, name: 'Hi Stricker' }, { id: 2, name: 'Puch Challenge' }, { id: 3, name: 'Bow & Arrow' }, { id: 4, name: 'Catch Fish' }];

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [setup, setSetup] = useState('');
  const [location, setLocation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transportCharge, setTransportCharge] = useState(0);

  const handleAddToCart = (game) => {
    setCart([...cart, game]);
  };

  const handleRemoveFromCart = (gameId) => {
    setCart(cart.filter((game) => game.id !== gameId));
  };

  const handleEnquiry = () => {
    
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    const locationDetails = eventLocations.find(
      (location) => location.id === parseInt(selectedLocation)
    );
    setLocation(locationDetails);
  };

  const calculateTransportCharge = (distance) => {
    let charge = 0;
    if (distance > 30) {
      charge += 1500;
      charge += (distance - 30) * 50;
    } else {
      charge += distance * 50;
    }
    setTransportCharge(charge);
  };

  const handleEventStartChange = (event) => {
    setEventStart(event.target.value);
  };

  const handleEventEndChange = (event) => {
    setEventEnd(event.target.value);
  };

  const handleSetupChange = (event) => {
    setSetup(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const getTotalDistance = () => {
    if (location) {
      return location.distance * 2; // round-trip distance
    } else {
      return 0;
    }
  };

  const getTotalCharge = () => {
    return transportCharge;
  };


  return (
    <div>
    {user ? (
      <div>
        <h2>Welcome, {user.name}!</h2>
        <h3>Games</h3>
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <span>{game.name}</span>
              <button onClick={() => handleAddToCart(game)}>Add to Cart</button>
            </li>
          ))}
        </ul>
        <h3>Cart</h3>
        <ul>
          {cart.map((game) => (
            <li key={game.id}>
              <span>{game.name}</span>
              <button onClick={() => handleRemoveFromCart(game.id)}>Remove from Cart</button>
            </li>
          ))}
        </ul>
        <h3>Event Details</h3>
        <form>
          <label>
            Event Start:
            <input type="datetime-local" value={eventStart} onChange={handleEventStartChange} />
          </label>
          <br />
          <label>
            Event End:
            <input type="datetime-local" value={eventEnd} onChange={handleEventEndChange} />
          </label>
          <br />
          <label>
            Setup:
            <input type="text" value={setup} onChange={handleSetupChange} />
          </label>
          <br />
          <label>
            Location:
            <select value={location?.id || ''} onChange={handleLocationChange}>
              <option value=''>Select location</option>
              {eventLocations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          {location && (
            <>
              <p>Distance: {location.distance} km (one way)</p>
              <p>Transport Charge: Rs. {transportCharge}</p>
            </>
          )}
          <button type="button" onClick={() => calculateTransportCharge(getTotalDistance())}>
            Calculate Transport Charge
          </button>
          <br />
          <label>
            Payment Method:
            <input type="text" value={paymentMethod} onChange={handlePaymentMethodChange} />
          </label>
        </form>
        <button onClick={handleEnquiry}>Enquire</button>
      </div>
    ) : (
      <div>
        <h2>Please log in to continue</h2>
        <button onClick={() => setUser({ id: 1, name: 'User' })}>Log in</button>
      </div>
    )}
  </div>
  );
}

