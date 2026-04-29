<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsRequest;
use App\Http\Resources\NewsCollection;
use App\Http\Resources\NewsResource;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : NewsCollection
    {
        $query = News::query();

        if (request() -> has('title')) {
            $query ->where('title','LIKE','%'.request() -> get('title').'%');
        }

        $news = $query->paginate(15);
        return new NewsCollection($news);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NewsRequest $request) : NewsResource
    {
        $news = News::create($request->validated());
        return new NewsResource($news);
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news) : NewsResource
    {
        return new NewsResource($news);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NewsRequest $request, News $news) : NewsResource
    {
        $news->update($request->validated());
        return new NewsResource($news);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news) : \Illuminate\Http\Response
    {
        $news->delete();
        return response()->noContent();
    }
}
