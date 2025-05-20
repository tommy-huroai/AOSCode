# Training AOSM Model

This guide explains how to create a new Huro AI model called **AOSM** using the `deepseek-r1:70b` base model in [Ollama](https://ollama.com/).

AOSM is intended to power agents within the AOS ecosystem and should be fine‑tuned with the procedures and best practices described in the "Comprehensive Development Guide: Building GABI and AOS Employee Agents".

## Requirements

- Ollama installed locally
- Sufficient GPU resources to run the 70B model
- Training data derived from the AOS development guide and related documentation

## Steps

1. **Pull the base model**
   ```bash
   ollama pull deepseek-r1:70b
   ```
2. **Prepare training data**
   - Extract key sections from the development guide.
   - Include example agent configurations and workflows.
   - Split long passages into shorter prompts for more focused answers.
   - Format the data as a JSONL file with `prompt` and `completion` fields.
   - Example entry:
     ```json
     {"prompt": "Explain the AOS architecture", "completion": "AOS consists of ..."}
     ```
3. **Create a model template**
   Define a `Modelfile` to fine‑tune the base model:
   ```
   FROM deepseek-r1:70b
   PARAMETER stop=["</s>"]
   SYSTEM "You are AOSM, a model specialized for AOS agent development."
   ```
4. **Train the model**
   ```bash
   ollama create aosm -f Modelfile -t training-data.jsonl
   ```
5. **Run the model**
   ```bash
   ollama run aosm
   ```

## Notes

- The training data should capture the best practices for agent design, orchestration, and guardrails.
- After training, evaluate the model using the workflows provided in the development guide.
- Iterate on the dataset and parameters to achieve the desired performance.

