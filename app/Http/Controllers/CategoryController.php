<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tournament;
use Illuminate\Http\Request;
use App\Policies\CategoryPolicy;


class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->authorizeResource(Category::class);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $categories = Category::all()->load('tournaments:name');

        return $categories;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'title'=>'required|string',
            // 'tournaments'=>'nullable|array',

        ]);

        $category = Category::create($request->all());

        // foreach ($request->tournaments as $id) {
        //     Tournament::findOrFail($id);
        //     $category->tournaments()->attach($id);
        // }

        $category = $category->load('tournaments:name');

        return $category;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {

        $category = $category->load('tournaments:name');

        return $category;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
            $request->validate([
                'title'=>'required|string',
                // 'tournaments'=>'nullable|array',
            ]);

            // $tournaments=[];
            // foreach ($request->tournaments as $id) {
            //     Tournament::findOrFail($id);
            //     array_push($tournaments, $id) ;
            // }

            // $category->tournaments()->sync($tournaments);

            $category->update($request->all());

            $category = $category->load('tournaments:name');
            return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
    }
}
