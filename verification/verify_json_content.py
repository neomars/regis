import json
import os

def verify():
    if not os.path.exists('content.json'):
        print("Error: content.json not found")
        return False

    with open('content.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    expected_files = ['index.html', 'hypnocoaching.html', 'coaching-sante.html', 'expertise.html', 'parcours.html']

    for file in expected_files:
        if file not in data:
            print(f"Error: {file} missing from JSON")
            return False
        if len(data[file]) == 0:
            print(f"Error: No content extracted for {file}")
            return False

    # Check for specific text on homepage
    homepage_texts = [item['text'] for item in data['index.html']]
    if "L'ANCRAGE MALOUIN" not in homepage_texts:
        print("Error: 'L'ANCRAGE MALOUIN' not found in index.html content")
        return False

    print("Verification successful: content.json contains valid data for all pages.")
    return True

if __name__ == "__main__":
    if verify():
        exit(0)
    else:
        exit(1)
