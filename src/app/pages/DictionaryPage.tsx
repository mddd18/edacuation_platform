import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Book, Search, ArrowRight } from "lucide-react";
import { dictionary } from "../data/dictionary";

export function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(dictionary.map(entry => entry.category)));

  // Filter entries based on search and category
  const filteredEntries = dictionary.filter(entry => {
    const matchesSearch = 
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2 flex items-center gap-3">
          <Book className="w-8 h-8 text-primary" />
          Legal Dictionary
        </h1>
        <p className="text-muted-foreground">
          Quick reference for legal terms and concepts
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search legal terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  !selectedCategory
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredEntries.length} of {dictionary.length} terms
        </p>
      </div>

      {/* Dictionary Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{entry.term}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {entry.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed mb-4">
                {entry.definition}
              </CardDescription>

              {/* Examples */}
              {entry.examples && entry.examples.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-primary mb-2">Examples:</h4>
                  <ul className="space-y-1">
                    {entry.examples.map((example, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="flex-1">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Terms */}
              {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-2">Related Terms:</h4>
                  <div className="flex flex-wrap gap-1">
                    {entry.relatedTerms.map((term, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Book className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No terms found</h3>
            <p className="text-sm text-muted-foreground text-center">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dictionary Stats */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Dictionary Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl font-bold text-primary">{dictionary.length}</p>
              <p className="text-sm text-muted-foreground">Total Terms</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <p className="text-2xl font-bold text-secondary">{categories.length}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <p className="text-2xl font-bold text-accent">12</p>
              <p className="text-sm text-muted-foreground">Terms Learned</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-500">3</p>
              <p className="text-sm text-muted-foreground">New This Week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
