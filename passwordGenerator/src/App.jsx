import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str[charIndex];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    document.execCommand("copy");
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4 py-6 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg md:max-w-md">
      <h1 className="text-3xl font-semibold text-center text-white mb-6">Password Generator</h1>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <input
          type="text"
          value={password}
          className="flex-grow mb-4 md:mr-2 md:mb-0 py-2 px-3 bg-white rounded-md outline-none"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md outline-none"
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <label htmlFor="length" className="mr-4 mb-2 md:mb-0 text-white">Length:</label>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          id="length"
          className="flex-grow mb-4 md:mr-2 md:mb-0"
          onChange={(e) => setLength(e.target.value)}
        />
        <span className="text-white md:ml-4">{length}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <input
          type="checkbox"
          checked={numberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
          className="mr-2"
        />
        <label htmlFor="numberInput" className="text-white mb-2 md:mb-0">Include Numbers</label>
      </div>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <input
          type="checkbox"
          checked={charAllowed}
          id="characterInput"
          onChange={() => setCharAllowed((prev) => !prev)}
          className="mr-2"
        />
        <label htmlFor="characterInput" className="text-white mb-2 md:mb-0">Include Special Characters</label>
      </div>
    </div>
  );
}

export default App;
