import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import Tilt from 'react-tilt'

import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

function App() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
  }, []);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Build your imagination here."
  );
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <div className="app-main">

      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            opacity: {
              value: 0
            }
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#000",
            },
            links: {
              opacity: 0,
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />


      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h2>See what you imagination looks like.</h2>

          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <button onClick={generateImage}>Generate an Image</button>
          {result.length > 0 ? (
            <Tilt className="Tilt" options={{ max: 10, speed:300, scale: 1.1, easing: "cubic-bezier(.5,.98,.52,.99)" }} style={{ height: 512, width: 512 }}>
              <img className="result-image" src={result} alt="result" />
            </Tilt>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;