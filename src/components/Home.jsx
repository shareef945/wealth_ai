import React from "react";
import { TextInput } from "@tremor/react";
import { useState } from "react";
import { Button } from "@tremor/react";
import { RefreshIcon } from "@heroicons/react/outline";
import env from "react-dotenv";
// require('dotenv').config()

export default function Home() {
  const { Configuration, OpenAIApi } = require("openai");
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY,
  });
  const [input, setInput] = useState();
  const openai = new OpenAIApi(configuration);

  async function generateNames(animal) {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: animalInput,
      temperature: 0.6,
    });

    return completion.data.choices[0].text.trim().split("\n");
  }

  async function onSubmit(event) {
    event.preventDefault();
    const animalInput = document.getElementById("animal-input").value.trim();
    try {
      const names = await generateNames(animalInput);
      setResult(names);
      setAnimalInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <div>{result}</div>
      <div>
        <div>
          <div>
            <TextInput
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
              placeholder="How may i help?"
              marginTop="mt-0"
              id="animal-input"
            />
          </div>
          <Button
            type="button"
            icon={RefreshIcon}
            iconPosition="left"
            size="sm"
            color="zinc"
            variant="secondary"
            onClick={onSubmit}
            marginTop="mt-5"
            loading={false}
            loadingText="">
            Execute
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
