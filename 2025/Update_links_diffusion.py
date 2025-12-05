import googleapiclient.discovery
from bs4 import BeautifulSoup
import os
#IMPORTANT
#If you're using this in the future, you're going to need to both get your google API key for youtube
#and change the channel ids to match whatever channels are currently being used
def get_current_livestream_url(api_key, channel_id):
    """Finds the URL of the current live stream for a given channel."""
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=api_key)

    try:
        request = youtube.search().list(
            part="snippet",
            channelId=channel_id,
            type="video",
            eventType="live", # Search for live broadcasts
            order="date", # Order by date to get the most recent (current) live stream
            maxResults=1 # We only need the latest one
        )
        response = request.execute()

        if response.get("items"):
            video_id = response["items"][0]["id"]["videoId"]
            # Construct the standard YouTube watch URL
            livestream_url = f"https://www.youtube.com/watch?v={video_id}"
            return livestream_url
        else:
            print(f"No active live stream found for channel ID {channel_id}.")
            return None

    except Exception as e:
        print(f"An error occurred while searching for live stream for channel ID {channel_id}: {e}")
        return None

def update_html_links(html_file_path, new_urls):
    """Reads an HTML file, updates specific links, and saves the changes."""
    try:
        with open(html_file_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

        # Find the div with class "video-links"
        video_links_div = soup.find('div', class_='video-links')

        if not video_links_div:
            print(f"Error: Could not find div with class 'video-links' in {html_file_path}")
            return False

        # Find all <a> tags within the video-links div
        links = video_links_div.find_all('a')

        if len(links) != len(new_urls):
            print(f"Warning: Found {len(links)} links but expected {len(new_urls)}. Updating available links.")
            # Use min to avoid index errors if link counts don't match
            num_links_to_update = min(len(links), len(new_urls))
        else:
             num_links_to_update = len(links)

        # Update the href attribute of each link with the corresponding new URL
        for i in range(num_links_to_update):
            links[i]['href'] = new_urls[i]
            print(f"Updated link {i+1} to: {new_urls[i]}")


        # Write the modified HTML back to the file
        with open(html_file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))

        print(f"Successfully updated links in {html_file_path}")
        return True

    except FileNotFoundError:
        print(f"Error: File not found at {html_file_path}")
        return False
    except Exception as e:
        print(f"An error occurred while updating the HTML file: {e}")
        return False


if __name__ == "__main__":
    # Replace with your actual API key and Channel IDs
    your_api_key = "YOUR_API_KEY_HERE"

    # Map the description (or old link purpose) to the Channel ID
    # The order in this dictionary should match the desired order of links in the HTML
    # Based on your HTML: Maternelle à la 4e année, 5e et 6e année, 7e et 8e année, 9e à la 12e année
    channel_ids = {
        "@Me_11218": "UCCiYSH4Bx7IutTCmTSREOqA", # Assuming this corresponds to the first link
        "@annoncesfranco3565": "UCg3iG-DiAxvzr_aAspq6B3Q", # Assuming this corresponds to the second link
        "@VanessaRainville": "UCmybDyC0NGoG509pkn1dOQg", # Assuming this corresponds to the third link
        "@valgeoffroy": "UCow3I-DVDjWHuZJ2b6ay3ng"  # Assuming this corresponds to the fourth link
    }

    # --- Security Note ---
    # Hardcoding API keys directly in scripts is generally not recommended
    # for production environments. Consider using environment variables
    # or a separate configuration file to store sensitive information.
    # For this example script, hardcoding is shown for simplicity.
    # -------------------

    # Path to your Diffusion.html file
    # Ensure this path is correct for your environment
    html_file = "Diffusion.html" # Assuming the script is in the same directory as Diffusion.html

    if your_api_key == "YOUR_API_KEY_HERE":
         print("Please replace 'YOUR_API_KEY_HERE' with your actual YouTube Data API key.")
    elif not os.path.exists(html_file):
        print(f"Error: HTML file not found at {html_file}. Please check the path.")
    else:
        print("Fetching current live stream URLs...")
        new_urls = []
        # Fetch URLs in the order defined in the channel_ids dictionary
        for handle, channel_id in channel_ids.items():
             url = get_current_livestream_url(your_api_key, channel_id)
             if url:
                 new_urls.append(url)
             else:
                 # Append a placeholder or handle missing streams as needed
                 print(f"Could not get live stream URL for {handle}. Skipping or using a placeholder.")
                 new_urls.append("#") # Or keep the old link, depending on desired behavior

        if new_urls:
            print("\nUpdating HTML file...")
            update_html_links(html_file, new_urls)
        else:
            print("\nNo new URLs fetched. HTML file not updated.")
