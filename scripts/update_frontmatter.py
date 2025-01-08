import os
import re
from datetime import datetime, date
import frontmatter

def standardize_date(date_val):
    """Convert any date value to yyyy-mm-dd format"""
    try:
        if isinstance(date_val, str):
            # Remove any quotes around the date
            date_val = date_val.strip('"\'')
            # Try different date formats
            for fmt in ['%Y-%m-%d', '%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M:%S', '%Y-%m-%dT%H:%M:%S%z']:
                try:
                    date_obj = datetime.strptime(date_val, fmt)
                    return date_obj.strftime('%Y-%m-%d')
                except ValueError:
                    continue
        elif isinstance(date_val, datetime):
            return date_val.strftime('%Y-%m-%d')
        elif isinstance(date_val, date):
            return date_val.strftime('%Y-%m-%d')
            
        return str(date_val).split(' ')[0]  # Fallback: take first part of any date string
    except Exception as e:
        print(f"Warning: Could not process date {date_val}: {e}")
        return str(date_val)

def clean_title(title):
    """Remove any existing quotes and wrap in single quotes"""
    # Remove any existing quotes (single or double)
    title = title.strip('"\'')
    return f"'{title}'"

def update_frontmatter(directory):
    # Get only .md files in the directory (exclude .mdx)
    md_files = [f for f in os.listdir(directory) if f.endswith('.md')]
    
    for filename in md_files:
        filepath = os.path.join(directory, filename)
        
        # Read the file
        post = frontmatter.load(filepath)
        
        # Create new metadata
        new_metadata = {}
        
        # Transfer title if it exists
        if 'title' in post.metadata:
            new_metadata['title'] = clean_title(str(post.metadata['title']))
            
        # Transfer date to publishedAt with standardized format
        if 'date' in post.metadata:
            new_metadata['publishedAt'] = standardize_date(post.metadata['date'])
            
        # Transfer description to summary
        if 'description' in post.metadata:
            new_metadata['summary'] = post.metadata['description']
        
        # Update the post's metadata
        post.metadata = new_metadata
        
        # Write back to file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))

if __name__ == "__main__":
    blog_posts_dir = "/Users/htlin/portfolio-and-blog/app/blog/posts"
    update_frontmatter(blog_posts_dir)
    print("Frontmatter update completed for .md files only!")
